import { getSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Todo App</title>
        <link rel="icon" href="/Logo.png" />
      </Head>
      <h3 style={{ color: "var(--bg-color-primary)" }}>
        please register or login to an account to manage your todos...
      </h3>
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
