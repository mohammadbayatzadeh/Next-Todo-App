import RegisterPage from "@/components/Templates/RegisterPage";
import { getSession } from "next-auth/react";

function Register() {
  return <RegisterPage />;
}

export default Register;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
