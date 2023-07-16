import User from "@/models/User";
import conncetDB from "@/utils/connectDB";
import { sortTodo } from "@/utils/sortTodo";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await conncetDB();
  } catch (err) {
    return res
      .status(422)
      .json({ status: "failed", message: "error in connecting to db" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "you are not logged in !" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "the user dows not exist" });
  }
  if (req.method === "POST") {
    const { title, status, description } = req.body;

    if (!title || !status || !description) {
      return res
        .status(422)
        .json({ status: "failed", message: "invalid data" });
    }
    user.todos.push({ title, description, status });
    await user.save();

    return res.status(200).json({ status: "success", message: "todo saved" });
  } else if (req.method === "GET") {
    const todos = user.todos;
    const sortedTodos = sortTodo(todos);

    return res.status(200).json({ status: "success", todos: sortedTodos });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "invalid data" });
    }
    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
    return res
      .status(200)
      .json({ status: "success", message: "todos status updated" });
  }
}
