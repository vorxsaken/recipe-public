import SliderContainer from "../SliderContainer"
import RecipeCard from "../RecipeCard"
import RecipeDetailsModal from "../RecipeDetails/RecipeDetailsModal"

export default function RecipeList({ wrap, recipes }: { wrap?: boolean, recipes: any[] }) {

    const item = recipes.map((recipe: any) => (
        <RecipeCard  
            recipeId={recipe.id}
            key={recipe.id}
            image={recipe.smallImage}
            title={recipe.title}
            calorie={recipe.calorie}
            ratings={recipe.ratings}
            collection={recipe.collections}
            serving={recipe.servingTime}
            shallow
            link={`/about?recipeDetails=${recipe.id}`}
        />
    ))

    return (
        <>
            <RecipeDetailsModal route="/about" shallow/>
            <SliderContainer title="Hottest Food 🔥" items={item} wrap={wrap} />
        </>
    )
}
