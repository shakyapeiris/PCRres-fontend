import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../Components/Layout";
import AuthContextProvider from "../Store/AuthContext";
import Head from 'next/head'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
    </>
  );
}
export default MyApp;
