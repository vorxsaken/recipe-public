import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/pages/api/_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { category, skip } = JSON.parse(req.body);

    try {
        const getCategory = await database.recipe.findMany({
            take: 20,
            skip: skip,
            orderBy: {
                created_at: 'desc'
            },
            where: {
                categories: {
                    has: category
                }
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

        })

        res.status(200).send(getCategory);

    } catch (error) {
        res.status(500).send(error);
    }
}