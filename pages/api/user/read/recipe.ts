import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, skip } = JSON.parse(req.body);

    try {
        const userRecipe = await database.recipe.findMany({
            where: {
                ownerId: userId as string
            },
            skip: skip,
            take: 20,
            orderBy: {
                created_at: 'desc'
            }
        }).catch(error => { throw new Error(error) });

        res.status(200).send(userRecipe);
    } catch (error) {
        res.status(500).send(error);
    }
}