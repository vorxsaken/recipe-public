import Image from "next/image"
import GiveComments from "./GiveComments";
import Comments from "./Comments";
import TitleRecipe from "./TitleRecipe";
import RecipeInfo from "./RecipeInfo";
import RecipeIngredient from "./RecipeIngredient";
import RecipeInstructions from "./RecipeInstructions";
import StarRating from "../StarRating";
import useSWR from 'swr';
import Skeletons from "../Skeletons";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { fetcher } from "@/utils";
import Button from "../Button";
import { useState } from 'react'
import Router from "next/router";
import { useDispatch } from "react-redux";
import { removeRecipe } from "@/store/Reducers/recipeReducer";
import { useMediaQuery } from "@/utils";

export default function RecipeDetails({ recipeID }: { recipeID: string }) {
    const dispatch = useDispatch();
    const { data: recipe } = useSWR(`/api/recipe/read/details/${recipeID || ''}`, fetcher, { revalidateOnFocus: true });
    const { data: comments } = useSWR(`/api/recipe/read/comment/${recipeID || ''}`, fetcher, { revalidateOnFocus: false });
    const { data: session } = useSession();
    const userId = useSelector((state: any) => state.user.userInfo.id);
    const [loadingDelete, setloadingDelete] = useState(false);
    const isSmall = useMediaQuery('(max-width: 600px)');
    const isMedium = useMediaQuery('(min-width: 600px)');

    const ratingCalc = (ratings: any) => {
        const calcRating = ratings?.reduce((init: any, rating: any) => {
            return init + rating.value
        }, 0) as any

        return (calcRating / (ratings?.length || 1)).toString()
    }

    const getrating = () => {
        const ratingValue = recipe?.ratings?.length > 0 ? recipe.ratings.filter((rating: any) => rating.recipeId === recipeID || rating.ownerId === userId)[0] : 0;
        return ratingValue;
    }

    const editRecipe = () => {
        window.location.href = `/editRecipe/${recipe.id}`
    }

    const deleteRecipe = () => {
        setloadingDelete(true)
        fetch(`/api/recipe/delete/${recipe.id}`)
            .then(() => {
                setloadingDelete(false);
                dispatch(removeRecipe(recipe.id))
                Router.back();
            })
            .catch(error => console.log(error));
    }

    const sendRating = async (value: number) => {
        if (userId) {
            await fetch(`/api/recipe/${getrating() != 0 ? 'update' : 'create'}/rating`, {
                method: 'POST',
                body: JSON.stringify({
                    value: value,
                    author: session?.user?.name,
                    ownerId: userId,
                    recipeId: recipeID,
                    ratingId: getrating().id
                })
            })
                .then(() => {
                    // window.history.back();
                    // window.location.reload();
                })
                .catch((error) => console.log(error))
        }
    }

    const commentsComponent =
        <>
            <GiveComments id={recipeID} author={session?.user?.name as string} ownerId={userId} />
            <Comments comments={comments} author={session?.user?.name as string} userId={userId} />
        </>

    if (!recipe) {
        return (
            <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-8 pt-4 pb-14 px-4'>
                <div className="w-full md:w-[600px] flex flex-col justify-center items-center gap-8">
                    <div className='w-full h-96 overflow-hidden rounded-md relative flex justify-center items-center'>
                        <Skeletons type="image" />
                    </div>
                    <Skeletons type="text input" count={2} />
                </div>
                <div className="w-full md:w-[600px] flex flex-col gap-6 justify-start items-start">
                    <div className="w-full flex flex-col gap-3">
                        <Skeletons type="title" />
                        <Skeletons type="subtitle" count={2} />
                    </div>
                    <Skeletons count={5} type='paragraph' />
                    <Skeletons count={5} type='paragraph' />
                    <Skeletons count={5} type='paragraph' />
                </div>
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:pt-4 pt-0 pb-0 md:pb-14 px-4'>
            <div className="w-full md:w-[600px] flex flex-col justify-center items-center gap-8">
                <div className='w-full h-96 overflow-hidden rounded-md relative bg-gray-200'>
                    <Image src={recipe?.bigImage} alt='burger' fill className="pointer-events-none object-cover" />
                </div>
                {isMedium && commentsComponent}
            </div>
            <div className="w-full md:w-[600px] flex flex-col gap-6 justify-start items-start">
                <div className="w-full flex flex-col gap-3">
                    <TitleRecipe owner={recipe?.owner?.name || ''} ownerId={recipe?.owner?.id || ''} recipeId={recipe?.id} title={recipe?.title} />
                    {
                        userId && (
                            <StarRating value={getrating()?.value} starAction={value => sendRating(value)} />
                        )
                    }
                    <RecipeInfo
                        calorie={recipe?.calorie}
                        servingTime={recipe?.servingTime}
                        servingTotal={recipe?.servingTotal}
                        rating={ratingCalc(recipe?.ratings)}
                    />
                    <div className="text-slate-600 text-sm bg-slate-50 rounded-lg p-2">
                        {recipe?.description}
                    </div>
                </div>
                <RecipeIngredient ingredients={recipe?.ingredients || []} />
                <RecipeInstructions instructions={recipe?.instructions || []} />
                {
                    recipe?.owner?.id === userId && (
                        <div className="w-full flex justify-center items-center gap-2 mt-6">
                            <Button small text onClick={editRecipe}>
                                Edit
                            </Button>
                            <Button small text loading={loadingDelete} onClick={deleteRecipe}>
                                Delete
                            </Button>
                        </div>
                    )
                }
                {isSmall && commentsComponent}
            </div>
        </div>
    )
}
