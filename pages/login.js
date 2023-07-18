import LoginPage from "@/components/Templates/LoginPage";
import { getSession } from "next-auth/react";
import Head from "next/head";

function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </>
  );
}

export default Login;

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
    props: {},
  };
}
