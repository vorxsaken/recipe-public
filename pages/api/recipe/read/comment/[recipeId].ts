import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { recipeId } = req.query;

    try {
        const getComments = await database.comment.findMany({
            where: {
                recipeId: recipeId as string 
            },
            include: {
                reply: {
                    include: {
                        owner: true
                    }
                },
                owner: true
            }
        }).catch(error => {throw new Error(error)})

        res.status(200).send(getComments)

    } catch (error) {
        res.status(500).send(error);
    }
}