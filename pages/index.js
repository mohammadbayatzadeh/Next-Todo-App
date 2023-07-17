import HomePage from "@/components/Templates/HomePage";
import { getSession } from "next-auth/react";

export default function Home({ session }) {
  if (!session)
    return (
      <h3 style={{ color: "var(--bg-color-primary)" }}>
        please register or login to an account to manage your todos...
      </h3>
    );
  return <HomePage />;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  return {
    props: { session },
  };
}
