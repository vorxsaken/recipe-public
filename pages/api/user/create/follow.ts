import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, userDotId } = JSON.parse(req.body);

    try {
        const setFollower = await database.follower.create({
            data: {
                userId: userDotId,
                idString: userId
            }
        })

        const setFollowing = await database.following.create({
            data: {
                userId: userId,
                idString: userDotId
            }
        })

        await database.userFollow.createMany({
            data: [
                {
                    followerId: setFollower.id,
                    userId: userId
                },
                {
                    followingId: setFollowing.id,
                    userId: userDotId
                }
            ]
        })

        res.status(200).send({ message: 'success' });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}