import AddTodopage from "@/components/Templates/AddTodopage";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import Head from "next/head";

function Edit({ todoID }) {
  return (
    <>
      <Head>
        <title>
          edit todo 
        </title>
      </Head>
      <AddTodopage todoID={todoID} />
    </>
  );
}

export default Edit;

export async function getServerSideProps(context) {
  const { todoID } = context.params;
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const user = await User.findOne({ email: session.user.email });
  return {
    props: { todoID },
  };
}
