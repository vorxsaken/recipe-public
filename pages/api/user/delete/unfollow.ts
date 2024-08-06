import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, userDotId } = JSON.parse(req.body);

    try {
        await database.user.update({
            where: {
                id: userDotId
            },
            data: {
                follower: {
                    deleteMany: {
                        idString: userId
                    }
                }
            }
        }).catch(error => { throw new Error(error) })

        await database.user.update({
            where: {
                id: userId
            },
            data: {
                following: {
                    deleteMany: {
                        idString: userDotId
                    }
                }
            }
        }).catch(error => { throw new Error(error )})

        res.status(200).send({ message: 'success unfollow' })
        
    } catch (error) {
        res.status(500).send(error)
    }
}