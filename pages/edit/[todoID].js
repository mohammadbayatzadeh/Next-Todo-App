import AddTodopage from "@/components/Templates/AddTodopage";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import Head from "next/head";

function Edit({ todo }) {
  return (
    <>
      <Head>
        <title>{todo.title}</title>
      </Head>
      <AddTodopage todo={todo} />
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
  const todo = user.todos.find((t) => t._id == todoID);
  return {
    props: { todo: JSON.parse(JSON.stringify(todo)) },
  };
}
