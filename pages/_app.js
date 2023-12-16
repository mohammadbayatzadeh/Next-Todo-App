import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

//layout
import Layout from "@/components/layout/Layout";

//styles
import "@/styles/globals.css";

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
