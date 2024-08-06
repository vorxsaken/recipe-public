import { useState } from 'react'
import GiveComments from './GiveComments';

interface CommentInfoUI {
    created: number,
    id: string,
    author: string,
    ownerId: string,
    inquired: string
}

export default function CommentInfo({ created, id, author, ownerId, inquired }: CommentInfoUI) {
    const [showReply, setshowReply] = useState(false);

    const getDate = (date: number) => {
        const convert = new Date(date)
        const month = (convert.getMonth() + 1).toString();
        const hour = (convert.getHours()).toString().length < 2 ? '0' + (convert.getHours()) : (convert.getHours());
        const minute = (convert.getMinutes()).toString().length < 2 ? '0' + (convert.getMinutes()) : (convert.getMinutes());
        return `${convert.getDate()}/${month.length < 2 ? '0' + month : month}/${convert.getFullYear()} @ ${hour}:${minute}`;
    }

    return (
        <div className='w-full pl-14 flex flex-col justify-start items-start gap-2'>
            <div className="text-[0.62rem] font-thin text-gray-500 flex justify-start items-start mt-1 gap-3">
                <span>{getDate(created)}</span>
                <span className="hover:text-gray-700 cursor-pointer" onClick={() => setshowReply(!showReply)}>Reply</span>
            </div>
            {
                showReply && (
                    <GiveComments
                        id={id}
                        author={author}
                        ownerId={ownerId}
                        reply
                        inquired={inquired}
                        hideReply={() => setshowReply(!showReply)}
                    />
                )
            }
        </div>
    )
}
