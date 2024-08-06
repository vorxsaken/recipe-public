import { useState, useEffect } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

interface starRating {
    lg?: boolean,
    value?: number,
    starAction: (value: number) => void
}

export default function StarRating({ lg, value, starAction }: starRating) {
    const [rating, setRating] = useState(value || 0);
    const [hover, setHover] = useState(0);

    const giveRating = (rating: number) => {
        setRating(rating);
        starAction(rating);
    }
    return (
        <div className={`w-32 flex justify-start items-center gap-2 text-xl cursor-pointer`}>
            {
                [...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <AiFillStar 
                            key={index}
                            className={index <= (hover || rating) ? "text-red-400" : "text-slate-300"}
                            onClick={() => giveRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                        </AiFillStar>
                    )
                })
            }
        </div>
    )
}
