import CommentCard from "./CommentCard"
import { useState } from 'react'
import CommentInfo from "./CommentInfo";
import { useSelector } from "react-redux";

export default function Reply({ replies }: { replies: any[] }) {
    const [showReply, setShowReply] = useState(false);
    const currentUser = useSelector((state: any) => state.user.userInfo);
    const recentComments = useSelector((state: any) => state.comment.recentComment);

    return (
        <div className='flex flex-col justify-start items-start gap-4 pl-12'>
            {
                replies.length > 0 && (
                    <div onClick={() => setShowReply(!showReply)} className="text-[0.65rem] text-gray-500 cursor-pointer hover:text-black select-none">
                        -------&nbsp;&nbsp;&nbsp;&nbsp; {showReply ? 'Hide' : 'View'} replies ({replies.length})
                    </div>
                )
            }

            {
                showReply && (
                    <div className="pb-4 flex flex-col gap-4">
                        {
                            replies.map(reply => (
                                <div key={reply.id}>
                                    <CommentCard
                                        email={reply.owner.email}
                                        commentId={reply.id}
                                        image={reply.owner.image}
                                        author={reply.author}
                                        comment={reply.text}
                                        inquired={reply.inquired}
                                    />
                                    <CommentInfo
                                        inquired={reply.author}
                                        author={currentUser.name}
                                        created={reply.created_at}
                                        id={reply.commentId}
                                        ownerId={currentUser.id}
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {
                replies.length > 0 && !showReply ? (
                    <>
                        {
                            recentComments.map((recentComment: any) => {
                                if (recentComment.commentId === replies[0].commentId) {
                                    return (
                                        <div key={recentComment.id}>
                                            <CommentCard
                                                email={recentComment.owner.email}
                                                commentId={recentComment.id}
                                                image={recentComment.owner.image}
                                                author={recentComment.author}
                                                comment={recentComment.text}
                                                inquired={recentComment.inquired}
                                            />
                                            <CommentInfo
                                                inquired={recentComment.author}
                                                author={currentUser.name}
                                                created={recentComment.created_at}
                                                id={recentComment.commentId}
                                                ownerId={currentUser.id}
                                            />
                                        </div>
                                    )
                                }
                            })
                        }
                    </>
                ) : ''
            }
        </div>
    )
}
