import AddTodopage from "@/components/Templates/dashboard/AddTodopage";
import { getSession } from "next-auth/react";
import Head from "next/head";

function AddTodo() {
  return (
    <>
      <Head>
        <title>Add Todo</title>
      </Head>
      <AddTodopage />
    </>
  );
}

export default AddTodo;

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
