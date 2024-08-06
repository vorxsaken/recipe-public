import React, { useState } from 'react'
import TextField from '../TextField'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { putComment, putReply, putRecentComment } from '@/store/Reducers/commentsReducer'
import { useSelector } from 'react-redux'

interface GiveCommentUI {
    id: string,
    author: string,
    ownerId: string,
    reply?: boolean,
    hideReply?: () => void,
    appendComment?: (comment: any) => void,
    inquired?: string
}

export default function GiveComments({ id, author, ownerId, reply, inquired, hideReply }: GiveCommentUI) {
    const [showButton, setShowButton] = useState(reply ? true : false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector((state: any) => state.user.userInfo.id);

    const sendComment = async () => {
        if (userId) {
            let comment = (document.getElementById(id) as HTMLInputElement).value;

            if (comment) {
                setLoading(true);
                await fetch(`/api/recipe/create/${reply ? 'reply' : 'comment'}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        recipeId: id,
                        comment: comment,
                        author: author,
                        ownerId: ownerId,
                        inquired: reply ? inquired : ''
                    })
                })
                    .then((data) => data.json())
                    .then((json) => {
                        setLoading(false);
                        setShowButton(false);
                        (document.getElementById(id) as HTMLInputElement).value = ''
                        
                        if (reply) {
                            dispatch(putReply(json));
                            dispatch(putRecentComment(json))
                        } else {
                            dispatch(putComment(json))
                        }
                        hideReply && hideReply();
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error)
                    });
            }
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-end gap-4">
            <TextField
                onFocus={() => setShowButton(true)}
                textArea={true}
                width={70}
                placeholder={reply ? 'give reply for this comment' : 'what do you think about this recipe ?'}
                id={id}
                small={reply}
                autoGrow
            />
            {
                showButton && (
                    <div className="flex justify-center items-center gap-4 ">
                        <Button small text={true} onClick={() => hideReply && reply ? hideReply() : setShowButton(false)}>
                            Cancel
                        </Button>
                        <Button small onClick={sendComment} loading={loading}>
                            {reply ? 'Reply' : 'Send'}
                        </Button>
                    </div>
                )
            }
        </div>
    )
}
