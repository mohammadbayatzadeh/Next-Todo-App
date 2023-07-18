import RegisterPage from "@/components/Templates/RegisterPage";
import { getSession } from "next-auth/react";
import Head from "next/head";

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
