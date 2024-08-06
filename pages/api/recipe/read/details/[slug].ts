import { NextApiRequest, NextApiResponse } from 'next';
import { database } from '../../../_base';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query as any;

    try {
        const getRecipe = await database.recipe.findUnique({
            where: {
                id: slug
            },
            include: {
                ingredients: true,
                ratings: true,
                owner: true
            }
        }).catch((error) => {
            throw new Error(error)
        })

        return res.status(200).send(getRecipe)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}