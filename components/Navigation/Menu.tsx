import Link from "next/link"
import Categories from "./Categories"


export default function Menu() {
    return (
        <div className="flex justify-center items-center gap-6 font-semibold text-slate-600 text-[0.9rem]">
            <Link href={'/'} className="hover:text-red-500 transition-all duration-300 ease-in-out cursor-pointer">Home</Link>
            <Categories />
            <Link href={'/about'} className="hover:text-red-500 transition-all duration-300 ease-in-out cursor-pointer">About</Link>
        </div>
    )
}
