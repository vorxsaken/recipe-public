import { NextApiRequest, NextApiResponse } from 'next';
import { database } from '../../_base';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        id,
        title,
        description,
        calorie,
        categories,
        smallImage,
        bigImage,
        instructions,
        ingredients
    } = JSON.parse(req.body)

    const filterIngredients = ingredients.map((ingredient: any) => { return {
        id: ingredient?.id,
        name: ingredient?.name,
        quantity: ingredient?.quantity,
        unit: ingredient?.unit
    }})

    try {
        await database.ingredient.deleteMany({
            where: {
                recipeId: id
            }
        }).catch(error => {throw new Error(error)});

        const updateRecipe = await database.recipe.update({
            where: {
                id: id as string
            },
            data: {
                title: title,
                description: description,
                calorie: calorie,
                categories: categories,
                smallImage: smallImage,
                bigImage: bigImage,
                instructions: instructions,
                ingredients: {
                    createMany: {
                        data: filterIngredients
                    }
                }
            },
            include: {
                ingredients: true
            }
        }).catch((error) => {throw new Error(error)})

        return res.status(200).send(updateRecipe);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}