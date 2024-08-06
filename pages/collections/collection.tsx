import Layout from "@/components/Layout"
import Button from "@/components/Button";
import RecipeCard from "@/components/RecipeCard";
import { useSelector } from "react-redux";
import RecipeDetailsModal from "@/components/RecipeDetails/RecipeDetailsModal";
import { useState } from 'react'
import Router from "next/router";
import FullScreenContent from "@/components/FullScreenContent";
import TextField from "@/components/TextField";
import { useDispatch } from "react-redux";
import { setTempCollection } from "@/store/Reducers/userReducer";

export default function Collection() {
    const collections = useSelector((state: any) => state.user.tempCollection);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const dispatch = useDispatch();
    const changeModal = () => { setshowModal(!showModal) }
    
    const deleteCollection = () => {
        setLoadingDelete(true);
        fetch(`/api/collection/delete/${collections.id}`)
            .then(() => {
                setLoadingDelete(false);
                Router.back();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const editCollection = () => {
        setLoadingEdit(true);
        fetch(`/api/collection/update`, {
            method: 'POST',
            body: JSON.stringify({
                id: collections.id,
                name: (document?.getElementById('collection-name') as any).value
            })
        })
            .then(res => res.json())
            .then((data) => {
                dispatch(setTempCollection(data));
                setLoadingEdit(false);
                setshowModal(false);
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <RecipeDetailsModal route="/collections/collection" />
            <FullScreenContent show={showModal} bg onChangeState={changeModal} >
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex flex-col justify-center items-start gap-2 px-8">
                        <span className="text-sm font-bold">
                            Collection Name
                        </span>
                        <TextField id='collection-name' defaultValue={collections?.name || ''} placeholder="enter new collection name ..." medium />
                    </div>
                    <Button small loading={loadingEdit} onClick={editCollection}>
                        Update
                    </Button>
                </div>
            </FullScreenContent>
            <Layout title={`${collections?.name || ''} Collection`}>
                <div className="w-full min-h-[700px] flex flex-col justify-start items-start gap-14 md:px-16 px-0 pt-20 pb-10">
                    <div className="w-full flex md:flex-row flex-col md:justify-between justify-start md:items-center items-center gap-4 md:gap-0">
                        <div className="text-4xl font-bold text-zinc-800">
                            {collections?.name || ''}
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <Button text onClick={deleteCollection} loading={loadingDelete}>
                                Delete
                            </Button>
                            <Button text onClick={() => setshowModal(true)}>
                                Edit
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex md:justify-start justify-center items-center gap-8 flex-wrap px-3">
                        {
                            collections?.recipes?.map((collection: any, index: any) => (
                                <RecipeCard
                                    key={collection?.id || index}
                                    title={collection?.title || ''}
                                    image={collection?.smallImage || ''}
                                    calorie={collection?.calorie || ''}
                                    recipeId={collection?.id || ''}
                                    ratings={collection?.ratings || ''}
                                    collection={collection?.collectionId || ''}
                                    link={`/collections/collection?recipeDetails=${collection?.id || ''}`}
                                />
                            ))
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}
