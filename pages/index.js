import LandingPage from "@/components/Templates/LandingPage";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Todo App</title>
        <link rel="icon" href="/Logo.png" />
      </Head>
      <LandingPage />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/todos",
      },
    };
  }

  return {
    props: { session },
  };
}
