import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import conncetDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await conncetDB();
  } catch (err) {
    return res
      .status(500)
      .json({ status: "failed", message: " error in connecting to db" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "invalid data" });
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(401)
      .json({ status: "failed", message: "this email already registered" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email, password: hashedPassword });
  return res
    .status(200)
    .json({ status: "success", message: "new user created", data: newUser });
}
