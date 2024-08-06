import Image from 'next/image';
import { BiAddToQueue, BiLogOut, BiSave, BiUser } from 'react-icons/bi'
import { signOut } from 'next-auth/react'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';    

export default function UserMenu() {
    const user = useSelector((state: any) => state.user.userInfo);
    const [showMenu, setshowMenu] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const checkIfClickOutside = (e: MouseEvent) => {
            const current = ref.current as any;
            if (showMenu && current && !current.contains(e.target)) {
                setshowMenu(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickOutside, false);

        return () => {
            document.removeEventListener('mousedown', checkIfClickOutside);
        }
    }, [showMenu])

    return (
        <div ref={ref} className='relative'>
            <button onClick={() => setshowMenu(!showMenu)} className='w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden cursor-pointer relative bg-gray-500 peer'>
                <Image src={user.image} alt='avatar' fill className='object-cover' />
            </button>
            {
                showMenu && (
                    <div className='w-52 py-2 absolute top-8 -left-40 bg-white rounded-lg drop-shadow-lg flex-col justify-center items-center
                    text-sm text-slate-800 flex'>
                        <Link href={`/profile/${user.id}`} as={`/profile/${user.id}`} className='w-full relative px-6 py-4 flex gap-4 justify-start items-center hover:bg-gray-100 cursor-pointer'>
                            <BiUser className='text-xl' />
                            <span>Profile</span>
                        </Link>
                        <Link href="/createRecipe" className='w-full relative px-6 py-4 flex gap-4 justify-start items-center hover:bg-gray-100 cursor-pointer'>
                            <BiAddToQueue className='text-xl' />
                            <span>Create Recipe</span>
                        </Link>
                        <Link href={`/collections/${user.id}`} className='w-full relative px-6 py-4 hidden md:flex gap-4 justify-start items-center hover:bg-gray-100 cursor-pointer'>
                            <BiSave className='text-xl' />
                            <span>Saved Recipes</span>
                        </Link>
                        <div
                            className='w-full relative px-6 py-4 flex gap-4 justify-start items-center hover:bg-gray-100 cursor-pointer'
                            onClick={() => signOut()}
                        >
                            <BiLogOut className='text-xl' />
                            <span>Logout</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
