import { useRouter } from "next/router"
import Layout from "@/components/Layout";
import RecipeDetails from "@/components/RecipeDetails/RecipeDetails";
import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../api/_base";

export default function Recipe({title}: {title: any}) {
    const router = useRouter();
    const { recipeDetails } = router.query;

    return (
        <Layout title={title.title}>
            <div className="pt-20 md:pt-6 pb-20 md:pb-0 overflow-y-auto">
                <RecipeDetails recipeID={recipeDetails as string} />
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
    const { recipeDetails } = req.query;
    const title = await  database.recipe.findUnique({
        where: {
            id: recipeDetails as string
        },
        select: {
            title: true
        }
    })

    return {
        props:{
            title
        }
    }
}
