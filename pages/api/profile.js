import User from "@/models/User";
import { comparePasswords } from "@/utils/auth";
import conncetDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await conncetDB();
  } catch (err) {
    return res
      .status(500)
      .json({ status: "failed", message: "error in connecting to db" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(422)
      .json({ status: "failed", message: "uot are not logged in " });
  }
  const existingUser = await User.findOne({ email: session.user.email });
  if (!existingUser) {
    return res
      .status(404)
      .json({ status: "failed", message: "user does not exist" });
  }
  if (req.method === "POST") {
    const { firstName, lastName, password } = req.body;
    if (!firstName || !lastName || !password) {
      return res
        .status(401)
        .json({ status: "failed", message: "invalid data" });
    }
    const isValid = await comparePasswords(password, existingUser.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ status: "failed", message: "password is incorrect" });
    }

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    await existingUser.save();

    return res
      .status(200)
      .json({ status: "success", message: "user info updated" });
  } else if (req.method === "GET") {
    return res.status(200).json({ status: "success", data: existingUser });
  }
}
