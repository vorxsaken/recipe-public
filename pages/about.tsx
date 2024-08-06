import Layout from "@/components/Layout"
import Hero from "@/components/Landing/Hero"
import RecipeList from "@/components/Landing/RecipeList"
import FoodCategory from "@/components/Landing/FoodCategory";
import { NextApiRequest, NextApiResponse } from "next";
import { database } from "./api/_base";

export default function about({ recipes }: { recipes: any }) {

  return (
    <>
      <Layout title="About">
        <Hero />
        <RecipeList recipes={recipes} />
        <FoodCategory />
      </Layout>
    </>
  )
}

export const getServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
  const recipes = await database.recipe.findMany({
    take: 10,
    orderBy: {
      created_at: 'desc'
    }
  })

  return {
    props: {
      recipes
    }
  }

}
