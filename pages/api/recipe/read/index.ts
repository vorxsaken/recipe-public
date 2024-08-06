import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '../../_base';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { skip } = JSON.parse(req.body);

    if (skip != undefined) {
        try {
            const getRecipe = await database.recipe.findMany({
                skip: skip,
                take: 20,
                orderBy: {
                    created_at: 'desc'
                },
                include: {
                    ratings: {
                        select: {
                            id: true,
                            value: true
                        }
                    },
                    collections: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }

            }).catch(err => { throw new Error(err) });

            return res.status(200).send(getRecipe);

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    res.status(417).send('expected paramater not fullfilled');
}