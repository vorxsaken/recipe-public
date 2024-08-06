import FullScreenContent from "../FullScreenContent"
import TextField from "../TextField"
import Button from "../Button"
import { BsX } from 'react-icons/bs'
import { useSelector, useDispatch } from "react-redux"
import { mergeCollections, resetCollection } from "@/store/Reducers/userReducer"
import { useState } from "react"

interface CreateCollectionUI {
    recipeId: string,
    show: boolean,
    changeShowEvent: () => void,
    successFetchColl: (data: any) => void
}
export default function CreateCollection({ recipeId, show, changeShowEvent, successFetchColl }: CreateCollectionUI) {
    const userId = useSelector((state: any) => state.user.userInfo.id);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();

    const createCollection = async () => {
        if(userId) {
            setloading(true);
            const req = await fetch(`/api/collection/create`, {
                method: 'POST',
                body: JSON.stringify({
                    recipeId: recipeId,
                    ownerId: userId,
                    name: ((document.getElementById('collection_name') as any).value)
                })
            })
            const res = await req.json();
            setloading(false)
            dispatch(mergeCollections([res]));
            successFetchColl(res);
        }

    }

    return (
        <FullScreenContent show={show} onChangeState={changeShowEvent} bg={true}>
            <div className="w-full min-h-[220px] bg-white rounded-lg flex flex-col justify-center items-center gap-6 pt-8">
                <div className="text-3xl absolute top-4 left-4">
                    <BsX onClick={changeShowEvent} className="cursor-pointer" />
                </div>
                <div className="w-full px-10">
                    <TextField id='collection_name' large placeholder="Create Collection" />
                </div>
                <Button loading={loading} onClick={() => createCollection()}>
                    Create
                </Button>
            </div>
        </FullScreenContent>
    )
}
