import LoginPage from "@/components/Templates/LoginPage";
import { getSession } from "next-auth/react";

function Login() {
  return <LoginPage />;
}

export default Login;

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
