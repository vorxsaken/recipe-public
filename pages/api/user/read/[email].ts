import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query;

    try {
        const getuser = await database.user.findUnique({
            where: {
                email: email as string
            },
            include: {
                collections: true,
                follower: {
                    select: {
                        userFollow: {
                            select: {
                                user: true
                            }
                        }
                    }
                },
                following: {
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

        res.status(200).send(getuser);

    } catch (error) {
        res.status(500).send(error);
    }
}