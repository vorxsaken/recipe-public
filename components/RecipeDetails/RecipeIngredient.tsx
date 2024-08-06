import React from 'react'

interface RecipeIngredientsUI {
    ingredients: {
        id: string,
        name: string,
        quantity: string,
        unit: string,
        recipeId: string
    }[]
}

export default function RecipeIngredient({ ingredients }: RecipeIngredientsUI) {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">
            <span className="text-lg font-bold text-slate-600">
                Ingredients
            </span>
            <ul className="font-thin list-disc list-outside text-slate-600 pl-8">
                {
                    ingredients.map((ingredient) => (
                        <li key={ingredient.id} className="pl-1">
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
