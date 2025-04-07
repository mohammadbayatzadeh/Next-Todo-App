import User from "@/models/User";
import conncetDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const id = req.query.todoID;
  const data = req.body || {};

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

  if (req.method === "PATCH") {
    const newTodos = user.todos.map((todo) => {
      if (todo._id == id) {
        return data;
      }
      return todo;
    });
    user.todos = newTodos;
    await user.save();
    res.status(200).json({ message: "todo updated" });
  }

  if (req.method === "DELETE") {
    const newTodos = user.todos.filter((todo) => todo._id != id);
    user.todos = newTodos;
    await user.save();
    res.status(200).json({ message: "todo deleted" });
  }
}
