import { ReactNode, useEffect } from "react"
import Nav from "./Navigation/Nav"
import Footer from "./Navigation/Footer"
import { useSession } from "next-auth/react"
import store from "@/store"
import { getUserInfo } from "@/store/Reducers/userReducer"
import { useSelector } from "react-redux"
import Head from "next/head"

export default function Layout({ children, title }: { children: ReactNode, title: string }) {
    const { data: session } = useSession();
    const isUserInfoFetched = useSelector((state: any) => state.user.isUserInfoFetched)
    const headTitle = `${title} | Food Recipe`;

    if (!isUserInfoFetched) {
        store.dispatch(getUserInfo(session?.user?.email as string));
    }

    return (
        <div className="">
            <Head>
                <title>{headTitle}</title>
            </Head>
            <Nav />
            <main className="md:mt-16 flex flex-col gap-10">
                {children}
            </main>
            <Footer />
        </div>
    )
}
