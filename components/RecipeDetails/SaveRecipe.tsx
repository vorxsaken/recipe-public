import FullScreenContent from "../FullScreenContent"
import { BsPlus, BsX } from 'react-icons/bs'
import Image, { StaticImageData } from "next/image"
import Lottie from 'lottie-react';
import LoadingAnimation from '../../assets/92025-loading.json';
import emptyImage from '../../assets/122148-empty-box-by-clxzero.json';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillMinusCircle } from 'react-icons/ai'
import { fetcher } from "@/utils";
import { resetCollection } from "@/store/Reducers/userReducer";

interface collectionType {
    collections: {
        id: string,
        name: string,
        recipeId: string[],
        ownerId: string,
        recipes: {
            id: string,
            smallImage: string
        }[]
    }[]
}

interface saveRecipeUI {
    recipeId: string,
    show: boolean,
    createEvent: () => void,
    closeEvent: () => void,
    newColl: collectionType
}

interface CollectionUI {
    id: string,
    image: string | StaticImageData,
    name: string,
    recipes: any[],
    recipeId: string,
    reFetch: (data: any) => void
}

function Collection({ id, image, name, recipes, recipeId, reFetch }: CollectionUI) {
    const [selected, setselected] = useState(false);
    const dispatch = useDispatch();
    var isInclude = recipes.some((recipe: any) => recipe.id == recipeId);
    const userEmail = useSelector((state: any) => state.user.userInfo.email);
    const userId = useSelector((state: any) => state.user.userInfo.id);

    const changeState = () => {
        if(userId) {
            setselected(selected ? false : true);
            fetch(`/api/collection/update/${selected ? 'disconnect' : 'connect'}`, {
                method: 'POST',
                body: JSON.stringify({
                    collectionId: id,
                    recipeId: recipeId
                })
            })
                .then(res => res.json())
                .then(async (json) => {
                    reFetch(json);
                    const getCollection = await fetcher(`/api/user/read/${userEmail}`);
                    dispatch(resetCollection(getCollection));
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        if (isInclude) setselected(true);
    }, [])

    return (
        <div key={id} className={`w-full h-20 p-4 flex justify-between items-start cursor-pointer 
        ${selected && 'bg-red-500'} rounded-lg relative border border-slate-300`} onClick={() => changeState()}>
            <div className="flex justify-start items-start gap-4">
                <div className="w-12 h-12 overflow-hidden rounded-md relative">
                    {
                        image ? (
                            <Image src={image} alt="collection" fill className="object-cover" />
                        ) : (
                            <Lottie animationData={emptyImage} className='bg-gray-200' />
                        )
                    }
                </div>
                <div className={`flex flex-col justify-start items-start ${selected && 'text-white'}`}>
                    <span>{name}</span>
                    <span className="text-xs font-thin">
                        {recipes.length} Recipe
                    </span>
                </div>
            </div>
            {
                selected && (
                    <div className="h-full flex justify-center items-center text-3xl opacity-30 text-gray-00">
                        <AiFillMinusCircle />
                    </div>
                )
            }
        </div>
    )
}

export default function SaveRecipe({ recipeId, show, createEvent, closeEvent, newColl }: saveRecipeUI) {
    const [collections, setcollections] = useState<collectionType>();
    const id = useSelector((state: any) => state.user.userInfo.id);

    const getCollections = async () => {
        const res = await fetcher(`/api/collection/read/${id}`);
        setcollections(res);
    }

    const refetch = (data: any) => {
        let currCollection: any = { ...collections };
        for (let i = 0; i < (currCollection?.collections.length || 0); i++) {
            if (currCollection?.collections[i].id == data.id) {
                if (currCollection) currCollection.collections[i] = data;
                setcollections(currCollection);
            }
        }
    }

    useEffect(() => {
        if (show || newColl) {
            getCollections()
        }

    }, [show, newColl])

    return (
        <FullScreenContent show={show} onChangeState={closeEvent} bg >
            <BsX onClick={closeEvent} className="absolute top-4 right-4 text-3xl cursor-pointer" />
            <div onClick={createEvent} className="w-full p-4 flex justify-start items-center gap-4 cursor-pointer">
                <BsPlus className="text-5xl text-slate-800" />
                <span>Create Collection</span>
            </div>
            <div className="w-full max-h-96 overflow-y-auto px-4 bg-white flex flex-col justify-start items-center font-bold gap-1">
                {
                    !collections ? (
                        <div className="p-2 h-20 overflow-y-hidden flex justify-center items-center">
                            <Lottie className="w-28" animationData={LoadingAnimation} />
                        </div>
                    ) : collections.collections.length == 0 ? (
                        <div className="p-2 flex justify-center items-center font-thin text-slate-500">
                            No Collections
                        </div>
                    ) : (
                        collections.collections.map((collection: any) => (
                            <Collection
                                id={collection.id}
                                image={collection?.recipes[collection.recipes.length - 1]?.smallImage}
                                name={collection.name}
                                recipeId={recipeId}
                                recipes={collection.recipes}
                                key={collection.id}
                                reFetch={(data) => refetch(data)}
                            />
                        ))
                    )
                }
            </div>
        </FullScreenContent>
    )
}


