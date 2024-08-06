import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id, name} = JSON.parse(req.body);

    try {
        const updated = await database.collection.update({
            where: {
                id
            },
            data: {
                name: name
            },
            include: {
                recipes: true
            }
        })

        res.status(200).send(updated)
    } catch (error) {
        res.status(500).send(error);
    }
}