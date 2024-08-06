import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/pages/api/_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { text } = req.query;
    

    try {
        const getuser = await database.user.findRaw({
            filter: {
                name: {
                    $regex: `${text}`
                }
            }
        })

        res.status(200).send(getuser);

    } catch (error) {
        res.status(500).send(error);
    }
}