import { useEffect } from 'react'
import FullScreenContent from '../FullScreenContent'
import { useRouter } from 'next/router'
import RecipeDetails from './RecipeDetails';

export default function RecipeDetailsModal({ route, shallow }: { route: string, shallow?: boolean }) {
    const router = useRouter();
    
    useEffect(() => {
        const body = document.body as any
        if (!!router.query.recipeDetails) {
            body.style.overflow = 'hidden'
        } else {
            body.style.overflow = 'auto'
        }

    }, [router.query.recipeDetails])

    return (
        <>
            <FullScreenContent show={!!router.query.recipeDetails} full bg onChangeState={() => router.push(route, route, { scroll: false, shallow: shallow })}>
                <RecipeDetails recipeID={router.query.recipeDetails as string} />
            </FullScreenContent>
        </>
    )
}
