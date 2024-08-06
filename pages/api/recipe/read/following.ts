import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../_base";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, skip } = JSON.parse(req.body);

    try {
        const recipes = await database?.user.findUnique({
            where: { id },
            select: {
                following: {
                    select: {
                        userFollow: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        recipes: {
                                            orderBy: {
                                                created_at: 'desc'
                                            },
                                            take: 20,
                                            skip: skip,
                                            include: {
                                                collections: {
                                                    select: {
                                                        id: true,
                                                        name: true
                                                    }
                                                },
                                                ratings: {
                                                    select: {
                                                        id: true,
                                                        value: true
                                                    }
                                                }
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        const twoDImArray = recipes?.following.map(foll => foll.userFollow?.user.recipes.map(recipe => recipe)) as any;
        const oneDimArray = [].concat(...twoDImArray);

        res.status(200).send(oneDimArray);

    } catch (error) {
        res.status(500).send(error)
    }
}