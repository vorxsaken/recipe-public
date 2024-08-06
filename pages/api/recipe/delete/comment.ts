import { getServerSession } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from "next";
import { database } from '../../_base';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { commentId, inquired, email } = JSON.parse(req.body);
    const session = await getServerSession(req, res, authOptions);

    try {
        if (email === session?.user?.email) {
            let deleteComment;

            if (inquired) {
                deleteComment = await database.replyComment.delete({
                    where: {
                        id: commentId as string
                    }
                }).catch(error => { throw new Error(error) })
            } else {
                database.comment.update({
                    where: {
                        id: commentId as string
                    },
                    data: {
                        reply: {
                            deleteMany: {}
                        }
                    }
                })
                    .then(async () => {
                        deleteComment = await database.comment.delete({
                            where: {
                                id: commentId as string
                            }
                        }).catch(error => { throw new Error(error) })
                    })
                    .catch(error => { throw new Error(error) })
            }

            res.status(200).send(deleteComment)
        }

        res.status(401).send('not current user')

    } catch (error) {
        res.status(500).send(error);
    }
}