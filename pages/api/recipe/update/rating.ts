import type { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../_base';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { ratingId, value } = JSON.parse(req.body);

    try {
        const updateRating = await database.rating.update({
            where: {
                id: ratingId
            },
            data: {
                value: value
            }
        })

        res.status(200).send(updateRating)
    } catch (error) {
        res.status(500).send(error)
    }

}