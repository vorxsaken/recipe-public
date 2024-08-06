import { AiOutlineHome, AiOutlineAlert } from 'react-icons/ai'
import { BiCategory, BiSave } from 'react-icons/bi'
import Link from 'next/link'
import Categories from './Categories'
import { useSelector } from 'react-redux'

export default function BottomMenu() {
    const id = useSelector((state: any) => state.user.userInfo.id);

    return (
        <div className="w-full px-6 py-4 flex justify-between items-center bg-white md:hidden ">
            <Link href={'/'} className="flex flex-col items-center justify-center">
                <AiOutlineHome className="text-2xl" />
                <span className="text-sm">Home</span>
            </Link>
            <Link href={'/about'} className="flex flex-col items-center justify-center">
                <AiOutlineAlert className="text-2xl" />
                <span className="text-sm">About</span>
            </Link>
            <Link href={`/collections/${id}`} className="flex flex-col items-center justify-center">
                <BiSave className="text-2xl" />
                <span className="text-sm">Saved</span>
            </Link>
            <Categories>
                <div className="flex flex-col items-center justify-center">
                    <BiCategory className='text-2xl' />
                    <span className='text-sm'>Category</span>
                </div>
            </Categories>
        </div>
    )
}
