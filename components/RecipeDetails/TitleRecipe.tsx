import { useState, useEffect } from 'react'
import { AiFillFolderAdd } from "react-icons/ai";
import { Poppins } from 'next/font/google'
const lobster = Poppins({ weight: '400', subsets: ['latin'] });
import CreateCollection from './CreateCollection';
import SaveRecipe from './SaveRecipe';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function TitleRecipe({ recipeId, title, owner, ownerId }: { recipeId: string, title: string, owner: string, ownerId: string }) {
    const [showSaveRecipe, setshowSaveRecipe] = useState(false)
    const [showCreateCollection, setShowCreateCollection] = useState(false);
    const [newCollection, setnewCollection] = useState<any>()
    const collections = useSelector((state: any) => state.user.collections);
    const [isSaved, setisSaved] = useState(false);
    const userId = useSelector((state: any) => state.user.userInfo.id);

    useEffect(() => {
        if (collections) {
            for (let i = 0; i < collections.length; i++) {
                if (collections[i].recipeId.some((id: any) => id === recipeId)) {
                    setisSaved(true);
                    break;
                }
                setisSaved(false)
            }
        }
    }, [collections])

    const showSaveRecipeEvent = () => {
        setshowSaveRecipe(!showSaveRecipe);
    }

    const showCreateCollectionEvent = () => {
        setShowCreateCollection(!showCreateCollection)
    }

    const successFetchColl = (data: any) => {
        setnewCollection(data);
        setShowCreateCollection(false);
    }

    return (
        <div className="w-full flex justify-center items-start">
            <div className='w-full flex flex-col justify-start items-start gap-2'>
                <span className={`text-xl md:text-4xl font-bold text-slate-800 ${lobster.className}`}>
                    {title}
                </span>
                <span className='text-xs ml-1 text-slate-700'>
                    Posted by &nbsp;
                    <Link href={`/profile/${ownerId}`}>{owner}</Link>
                </span>
            </div>
            {
                userId && (
                    <div
                        className={`${isSaved ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-100 hover:bg-gray-200'} group p-2 rounded-xl cursor-pointer`}
                        onClick={showSaveRecipeEvent}
                    >
                        <AiFillFolderAdd
                            className={`text-3xl ${isSaved ? 'text-red-500 group-hover:text-red-600' : 'text-gray-500 group-hover:text-gray-600'}`}
                        />
                    </div>
                )
            }
            <SaveRecipe
                newColl={newCollection}
                recipeId={recipeId}
                show={showSaveRecipe}
                closeEvent={showSaveRecipeEvent}
                createEvent={showCreateCollectionEvent}
            />
            <CreateCollection
                recipeId={recipeId}
                show={showCreateCollection}
                changeShowEvent={showCreateCollectionEvent}
                successFetchColl={(data) => successFetchColl(data)}
            />
        </div>
    )
}
