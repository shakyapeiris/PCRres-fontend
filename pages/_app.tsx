import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../Components/Layout'
import AuthContextProvider from '../Store/AuthContext'
function MyApp({ Component, pageProps }: AppProps) {
  return <AuthContextProvider><Layout><Component {...pageProps} /></Layout></AuthContextProvider>
}
export default MyApp
