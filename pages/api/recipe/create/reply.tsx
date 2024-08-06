import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { recipeId: id, comment, author, ownerId, inquired } = JSON.parse(req.body)

    try {
        const addReply = await database.replyComment.create({
            data: {
                author: author,
                inquired: inquired,
                text: comment,
                commentId: id,
                ownerId: ownerId,
                created_at: Date.now()
            },
            include: {
                owner: true
            }
        }).catch(error => { throw new Error(error) })

        res.status(200).send(addReply);

    } catch (error) {
        res.status(500).send(error);
    }
}