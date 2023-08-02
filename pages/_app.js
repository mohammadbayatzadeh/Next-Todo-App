import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

//layout
import Layout from "@/components/layout/Layout";

//styles
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
