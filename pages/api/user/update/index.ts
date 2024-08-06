import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, username, description, image } = JSON.parse(req.body);

    try {
        const updateUser = await database.user.update({
            where: {
                id: userId
            },
            data: {
                name: username,
                description: description,
                image: image
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
        }).catch(error => { throw new Error(error) });

        res.status(200).send(updateUser);

    } catch (error) {
        res.status(500).send(error);
    }
}