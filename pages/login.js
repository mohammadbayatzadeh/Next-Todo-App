import { getSession } from "next-auth/react";
import Head from "next/head";

//temps
import LoginPage from "@/components/Templates/LoginPage";

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
