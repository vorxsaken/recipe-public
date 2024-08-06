import Image from 'next/image'
import Logo from '../../assets/images/Food Recipe.png'
import Menu from './Menu'
import UserMenu from './UserMenu'
import { BiSearchAlt } from 'react-icons/bi'
import Button from "../Button"
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react'
import SearchModal from './SearchModal'
import { useMediaQuery } from '@/utils'

export default function TopMenu() {
    const [showModal, setShowModal] = useState(false);
    const { data: session, status } = useSession();
    const small = useMediaQuery('(max-width: 500px)');

    const navSignButton = status === 'authenticated' ? <UserMenu /> : status === "unauthenticated" ?
        <Button
            onClick={() => signIn('google')}
            text={true}
            small={small}
        >
            Sign In
        </Button> : <span></span>

    return (
        <>
            <div className="md:flex flex-row justify-center items-center gap-14 hidden">
                <div className="flex justify-center items-center">
                    <Image src={Logo} alt='logo' width={130} />
                </div>
                <Menu />
            </div>
            <div className="md:flex justify-center gap-6 items-center hidden">
                <BiSearchAlt onClick={() => setShowModal(!showModal)} className="text-2xl cursor-pointer text-slate-700" />
                {navSignButton}
            </div>
            {/* search dialog on small screen */}
            <SearchModal showModal={showModal} openSearch={() => setShowModal(!showModal)} />
            {/* top head on small screen */}
            <div className="w-full p-3 md:p-4 flex justify-between items-center md:hidden fixed top-0 border-b-2 border-slate-100 z-20 bg-white">
                <BiSearchAlt onClick={() => setShowModal(!showModal)} className="text-3xl md:text-2xl"  />
                <div className="flex justify-center items-center">
                    <Image src={Logo} alt='logo' width={130} />
                </div>
                {navSignButton}
            </div>
        </>
    )
}
