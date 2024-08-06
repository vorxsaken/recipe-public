import { ReactNode } from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from '../assets/loading.json'
import blackLoading from '../assets/loading-black.json'

interface button {
    children: ReactNode,
    text?: boolean,
    small?: boolean,
    loading?: boolean,
    [key: string]: any
}

export default function Button(props: button) {
    const { children, text, small, loading } = props;

    return (
        <div className={`rounded-md flex justify-center items-center font-semibold
        cursor-pointer ${text ? 'hover:text-red-500 hover:bg-gray-50 text-slate-600 text-sm md:text-[0.9rem] border border-slate-400' :
                'text-sm text-white bg-red-500 hover:bg-red-600'} ${small ? 'w-24 h-8' : 'w-28 h-10'}`}
            {...props}>
            {
                loading ? (
                    <Lottie className={`${text ? 'w-14 mt-1' : 'w-20'}`} animationData={text ? blackLoading : loadingAnimation} />
                ) : children
            }
        </div>
    )
}
