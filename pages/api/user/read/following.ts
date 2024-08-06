import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/pages/api/_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, skip } = JSON.parse(req.body);

    try {
        const getFollow = await database.user.findMany({
            where: {
                id: userId as string
            },
            select: {
                following: {
                    take: 20,
                    skip: skip,
                    select: {
                        userFollow: {
                            select: {
                                user: true
                            }
                        }
                    }
                }
            }
        })

        const following = getFollow[0].following;
        res.status(200).send(following);

    } catch (error) {
        res.status(500).send(error);
    }
}