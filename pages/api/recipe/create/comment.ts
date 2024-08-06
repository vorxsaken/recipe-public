import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { recipeId, comment, author, ownerId } = JSON.parse(req.body);

    try {
        const sendComment = await database.comment.create({
            data: {
                recipeId: recipeId,
                text: comment,
                author: author,
                ownerId: ownerId,
                created_at: Date.now()
            },
            include: {
                owner: true,
                reply: true
            }
        }).catch(error => { throw new Error(error) });

        res.status(200).send(sendComment);

    } catch (error) {
        res.status(500).send(error)
    }
}