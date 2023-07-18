import ProfilePage from "@/components/Templates/ProfilePage";
import { getSession } from "next-auth/react";
import Head from "next/head";

function Profile() {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfilePage />
    </>
  );
}

export default Profile;

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
