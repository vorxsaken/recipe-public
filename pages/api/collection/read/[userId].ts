import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    try {
        const getCollection = await database.user.findUnique({
            where: {
                id: userId as string
            },
            select: {
                collections: {
                    include: {
                        recipes: {
                            select: {
                                id: true,
                                smallImage: true
                            }
                        }
                    }
                }
            }

        }).catch(error => {throw new Error(error)})

        res.status(200).send(getCollection);
    } catch (error) {
        res.status(500).send(500);
    }
}