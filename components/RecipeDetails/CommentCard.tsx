import Image from "next/image"
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { useState, useEffect, useRef } from "react"
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/loading-black.json';
import { useDispatch } from "react-redux";
import { deleteComment, deleteReply } from "@/store/Reducers/commentsReducer";
import { useSelector } from "react-redux";

interface CommentCardUI { 
    commentId: string, 
    comment: string, 
    image: string, 
    author: string, 
    inquired?: string,
    email: string
}

export default function CommentCard({ commentId, comment, image, author, inquired, email }: CommentCardUI) {
    const [showOptions, setshowOptions] = useState(false);
    const [showThreeDots, setshowThreeDots] = useState(false);
    const [loadingDelete, setloadingDelete] = useState(false);
    const userEmail = useSelector((state: any) => state.user.userInfo.email);
    const userId = useSelector((state: any) => state.user.userInfo.id);
    const ref = useRef(null)
    const dispatch = useDispatch();

    const visibleThreeDots = () => {
        if (email == userEmail) {
            setshowThreeDots(true)
        }
    }

    const hideThreeDots = () => {
        if (showOptions) setshowThreeDots(true)
        else setshowThreeDots(false)
    }

    const deletePost = () => {
        setloadingDelete(true);
        fetch(`/api/recipe/delete/comment`, {
            method: 'POST',
            body: JSON.stringify({
                commentId: commentId,
                inquired: inquired ? true : false,
                email: email
            })
        })
            .then(() => {
                inquired ? dispatch(deleteReply(commentId)) : dispatch(deleteComment(commentId));
                setloadingDelete(false);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            const current = ref.current as any;
            if (showOptions && ref.current && !current.contains(e.target)) {
                setshowOptions(false);
                setshowThreeDots(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside, false);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showOptions])

    return (
        <div
            className="flex justify-start items-start gap-4"
            onMouseEnter={() => visibleThreeDots()}
            onMouseLeave={() => hideThreeDots()}
        >
            <div className="w-10 h-10 overflow-hidden rounded-full flex justify-center items-center relative">
                <Image src={image} alt='avatar' fill className="pointer-events-none object-cover" />
            </div>
            <div className=" w-[500px] flex flex-col justify-start items-start">
                <span className="font-bold text-md text-slate-800">
                    {author}
                </span>
                <span className="text-sm text-gray-700">
                    {inquired && (<span className="text-pink-600 text-sm">@{inquired}</span>)} {comment}
                </span>
            </div>
            {
                (showThreeDots && userId) && (
                    <div className="right-0 text-slate-800 text-lg cursor-pointer relative">
                        <div className="p-2 rounded-full" onClick={() => setshowOptions(!showOptions)}>
                            <BsThreeDotsVertical />
                        </div>
                        {
                            showOptions && (
                                <div ref={ref} className="min-w-[90px] absolute flex flex-col justify-start items-start gap-2 py-1 bg-white drop-shadow-md text-sm rounded-lg">
                                    <span onClick={deletePost} className="w-full h-8 flex justify-center items-center gap-2 hover:bg-gray-100 px-6 py-2 overflow-y-hidden">
                                        {
                                            loadingDelete ? (
                                                <Lottie className="w-16 text-slate-600 pt-2" animationData={loadingAnimation} />
                                            ) : (
                                                <>
                                                    <BsTrash className="text-lg text-slate-800" />
                                                    <span className="text-base">Delete</span>
                                                </>
                                            )
                                        }
                                    </span>
                                </div>
                            )
                        }
                    </div>

                )
            }
        </div>
    )
}