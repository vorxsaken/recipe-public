import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const del = await database.collection.delete({
            where: {
                id: id as string
            }
        })

        res.status(200).send(del)
    } catch (error) {
        res.status(500).send(error);
    }
}