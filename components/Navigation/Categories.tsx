import { useState, ReactNode, useEffect, useRef } from 'react'
import { categories } from '@/utils'
import { useMediaQuery } from '@/utils';
import Link from 'next/link';

function Categories({ children }: { children?: ReactNode }) {
    const [Open, setOpen] = useState(false);
    const ref = useRef(null);
    const isSmall = useMediaQuery('(max-width: 600px)')
    var timeOut: any;

    const close = () => {
        timeOut = setTimeout(() => {
            setOpen(false);
        }, 300);
    }

    const open = () => {
        clearTimeout(timeOut);
        setOpen(true);
    }

    useEffect(() => {
        if(isSmall) {
            const checkIfClickOutside = (e: MouseEvent) => {
                const current = ref.current as any;
                if (Open && current && !current.contains(e.target)) {
                    setOpen(false)
                }
            }
    
            document.addEventListener('mousedown', checkIfClickOutside, false);
    
            return () => {
                document.removeEventListener('mousedown', checkIfClickOutside);
            }
        }
    }, [open])

    return (
        <div ref={ref} className='w-auto h-auto relative' onMouseLeave={close} >
            <div
                className='hover:text-red-500 transition-all duration-300 ease-in-out cursor-pointer text-sm md:text-base'
                onMouseOver={open}
                onClick={() => setOpen(!Open)}
            >
                {children ? children : 'Categories'}
            </div>
            <div
                className={`w-80 h-72 justify-center items-center gap-2 absolute -top-[19.5rem] -left-60 md:-left-0 md:top-9 flex-wrap ${Open ? 'flex' : 'hidden'} 
                rounded-xl py-2 bg-white drop-shadow-lg`}
                onMouseOver={open}
            >
                {
                    categories.map(category => (
                        <Link href={`/category/${category.name}`} key={category.name} className='w-36 h-10 hover:text-red-500 transition-all duration-300 ease-in-out 
                        cursor-pointer rounded-lg border border-slate-100 hover:border-red-300 flex justify-start items-center pl-3'>
                            {
                                category.name
                            }
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories