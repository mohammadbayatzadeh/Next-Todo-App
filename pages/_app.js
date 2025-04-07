import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <NextTopLoader color="#fff" />
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
