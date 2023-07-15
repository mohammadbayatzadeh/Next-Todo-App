import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

//functions
import { comparePasswords } from "@/utils/auth";
import conncetDB from "@/utils/connectDB";

//models
import User from "@/models/User";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await conncetDB();
        } catch (err) {
          throw new Error("error in connecting to db");
        }

        if (!email || !password) {
          throw new Error("invalid data!");
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          throw new Error("user not exist");
        }

        const isValid = await comparePasswords(password, existingUser.password);

        if (!isValid) {
          throw new Error("email or password is inccorect");
        }

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
