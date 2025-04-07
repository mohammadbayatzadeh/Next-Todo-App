import { getSession } from "next-auth/react";
import Head from "next/head";
import RegisterPage from "@/components/Templates/auth/RegisterPage";

function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <RegisterPage />
    </>
  );
}

export default Register;

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
