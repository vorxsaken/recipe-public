import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {collectionId, recipeId} = JSON.parse(req.body);

    try {
        const connectRecipe = await database.collection.update({
            where: {
                id: collectionId
            },
            data: {
                recipes: {
                    connect: {
                        id: recipeId
                    }
                }
            },
            include: {
                recipes: {
                    select: {
                        id: true,
                        smallImage: true
                    }
                }
            }
        }).catch(error => {throw new Error(error)});

        res.status(200).send(connectRecipe)
    } catch (error) {
        res.status(500).send(error)
    }
}