import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { value, author, recipeId, ownerId } = JSON.parse(req.body);

    try {
        const giveRating = await database.rating.create({
            data: {
                value: value,
                author: author,
                recipeId: recipeId,
                ownerId: ownerId
            }
        }).catch(error => { throw new Error(error) })

        res.status(200).send(giveRating);

    } catch (error) {
        res.status(500).send(error)
    }
}