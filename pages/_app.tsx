import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Archivo } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import store from '../store/index'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import Router from "next/router"
import NProgress from 'nprogress'
import '../styles/nprogress.css'
const manrope = Archivo({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  useEffect(() => {
    NProgress.configure({showSpinner: false, trickleSpeed: 300});
    
    Router.events.on("routeChangeStart", (url) => {
      NProgress.start();
    })

    Router.events.on("routeChangeComplete", (url) => {
      NProgress.done(false);
    })

  }, [Router])

  return (
    <SessionProvider session={session} refetchWhenOffline={false}>
      <Provider store={store}>
        <div className={`${manrope.className}`}>
          <Component {...pageProps} />
        </div>
      </Provider>
    </SessionProvider>
  )
}
