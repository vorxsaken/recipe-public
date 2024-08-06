import type { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../_base';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const deleteRecipe = await database.recipe.delete({
            where: {
                id: id as string
            }
        }).catch(error => {throw new Error(error)})

        res.status(200).send(deleteRecipe);
    } catch (error) {
        res.status(500).send(error)
    }

}