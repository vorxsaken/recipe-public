import Skeletons from "../Skeletons"
import CommentInfo from "./CommentInfo"
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import { setComments } from "@/store/Reducers/commentsReducer";
import { useDispatch } from "react-redux";
import CommentCard from "./CommentCard";
import Reply from "./Reply";

export default function Comments({ comments, author, userId }: { comments: any[], author: string, userId: string }) {
    const commentOrdered = useSelector((state: any) => state.comment);
    const dispatch = useDispatch();

    useEffect(() => {
        if (comments) {
            const authorComment = comments.filter((comment: any) => comment.ownerId === userId).sort((x: any, y: any) => y.created_at - x.created_at);
            const otherComment = comments.filter((comment: any) => comment.ownerId !== userId).sort((x: any, y: any) => y.created_at - x.created_at);
            dispatch(setComments(authorComment.concat(otherComment)))
        }
    }, [comments])

    if (commentOrdered.status === 'loading') {
        return (
            <div className="w-full p-2 flex flex-col justify-start items-start gap-6">
                <div className="flex justify-start items-start gap-4">
                    <div className="w-10 h-10 overflow-hidden bg-gray-200 rounded-full flex justify-center items-center">
                        <Skeletons type="image" />
                    </div>
                    <div className=" w-[500px] flex flex-col justify-start items-start gap-4">
                        <Skeletons type="title" />
                        <Skeletons type="paragraph" count={3} />
                    </div>
                </div>
            </div>
        )
    }

    if (commentOrdered.comment.length === 0) {
        return (
            <div className="w-full flex justify-center items-center flex-col p-2">
                <span className="font-bold text-base text-slate-800">
                    No Comment Yet
                </span>
                <span className="font-thin text-xs text-slate-600">
                    Be the first one to comment in this recipe
                </span>
            </div>
        )
    }

    return (
        <div className="w-full p-2 flex flex-col justify-start items-start gap-2">
            {
                commentOrdered.comment.map((comment: any) => (
                    <div key={comment.id} className="flex flex-col justify-start items-start gap-2">
                        <CommentCard
                            commentId={comment.id}
                            comment={comment.text}
                            author={comment.author}
                            image={comment.owner.image}
                            email={comment.owner.email}
                        />
                        <CommentInfo
                            id={comment.id}
                            author={author}
                            created={comment.created_at}
                            inquired={comment.author}
                            ownerId={userId}
                        />
                        <Reply replies={comment.reply} />
                    </div>
                ))
            }
        </div>
    )
}
