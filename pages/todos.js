import { getSession } from "next-auth/react";
import Head from "next/head";

//temps
import HomePage from "@/components/Templates/dashboard/HomePage";

function Home() {
  return (
    <>
      <Head>
        <title>Todos</title>
      </Head>
      <HomePage />
    </>
  );
}

export default Home;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { session },
  };
}
