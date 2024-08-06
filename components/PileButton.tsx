import { ReactNode, useState } from 'react'

export default function PileButton({ children, value, defaultValue }: { children: ReactNode[] | ReactNode, value?: (sel: any) => void, defaultValue?: string }) {
    const [selected, setselected] = useState(defaultValue || '')
    const getselected = (val: any) => {
        setselected(val);
        value && value(val);
    }

    if (Array.isArray(children)) {
        const newChildren = children.filter(child => child != "");
        return (
            <div className="h-8 md:h-9 border border-slate-400 flex flex-row justify-center items-center rounded-3xl overflow-hidden">
                {
                    newChildren?.map((child, index) => (
                        <div key={index} className={`${index !== children.length - 1 ? 'border-r border-slate-300' : 'border-0'} 
                        ${selected === (child as any)?.props?.children ? 'bg-zinc-100 text-red-500 ' : 'text-zinc-700'} 
                        ${newChildren.length > 1 ? 'px-6' : 'px-10'} hover:text-red-500 h-full w-full text-xs 
                        cursor-pointer flex justify-center items-center`}
                            onClick={(e) => getselected((child as any).props.children)}>
                            {child}
                        </div>
                    ))
                }
            </div >
        )
    }

    return (
        <div className="h-8 md:h-9 border border-slate-400 flex flex-row justify-center items-center rounded-3xl overflow-hidden">
            <div className={`border-0 bg-white text-red-500 h-full w-full px-10 text-xs cursor-pointer flex justify-center items-center`}>
                {children}
            </div>
        </div>
    )
}
