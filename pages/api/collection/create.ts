import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, recipeId, ownerId } = JSON.parse(req.body);

    try {
        const createCollection = await database.collection.create({
            data: {
                name: name,
                recipeId: recipeId,
                ownerId: ownerId,
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

        res.status(200).send(createCollection)

    } catch (error) {
        res.status(500).send(error);
    }
}