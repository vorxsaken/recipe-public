import { BiTime, BiBowlHot, BiStar } from 'react-icons/bi'
import { GiSpoon } from 'react-icons/gi'

export default function RecipeInfo({servingTime, servingTotal, rating, calorie}: {servingTime?: string, servingTotal?: string, rating?: string, calorie?: string}) {
    return (
        <div className="flex justify-start items-start gap-3 text-[0.7rem] md:gap-4 md:text-sm">
            <div className="flex justify-center items-center gap-2">
                <BiTime className="text-lg text-red-400 " />
                <span className="text-slate-700">{servingTime} min serving</span>
            </div>
            <div className="flex justify-center items-center gap-2">
                <BiBowlHot className="text-lg text-red-400" />
                <span className="text-slate-700">{servingTotal} servings</span>
            </div>
            <div className="flex justify-center items-center gap-2">
                <BiStar className="text-lg text-red-400" />
                <span className="text-slate-700">{rating}</span>
            </div>
            <div className="flex justify-center items-center gap-2">
                <GiSpoon className="text-lg text-red-400" />
                <span className="text-slate-700">{calorie} cal</span>
            </div>
        </div>
    )
}
