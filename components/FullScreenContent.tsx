import { ReactNode, useRef } from "react";
import { CgClose } from 'react-icons/cg'
import { useMediaQuery } from "@/utils";
interface fullscreenUI { children: ReactNode, show?: boolean, bg?: boolean, full?: boolean, onChangeState: () => void }

export default function FullScreenContent({ children, show = false, bg, full, onChangeState }: fullscreenUI) {
    const ref = useRef(null);
    const isSmall = useMediaQuery('(max-width: 600px)');

    const hideModal = (event: MouseEvent) => {
        if (event.target == ref.current) {
            onChangeState()
        }
    }

    return (
        <>
            {show && (
                <div ref={ref} id='overlay' className={`w-screen h-full fixed bg-slate-800 top-0 
                    left-0 flex justify-center items-start ${!full && 'px-4'} z-50 ${bg ? 'bg-opacity-60' : 'bg-opacity-0'} ${isSmall && 'overflow-auto'}`}
                    onClick={(e: any) => hideModal(e)}
                >
                    {
                        full && (
                            <CgClose className="absolute top-2 right-3 text-3xl md:text-2xl text-white cursor-pointer" onClick={(e: any) => onChangeState()} />
                        )
                    }
                    <div className={`w-full ${full ? 'md:w-full md:h-full top-12 md:top-10 rounded-b-none rounded-t-3xl overflow-y-auto' : 'md:w-1/3 rounded-lg top-20'} bg-white shadow-lg relative flex flex-col 
                    justify-between items-center gap-4 pt-8 pb-8`}>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}
