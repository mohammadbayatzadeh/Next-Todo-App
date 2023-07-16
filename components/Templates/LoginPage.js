import { useState } from "react";
import { VscMail, VscLock } from "react-icons/vsc";
import { useRouter } from "next/router";

//functions
import { signIn } from "next-auth/react";

//styles
import styles from "./LoginPage.module.css";

//elements
import Toast from "../elements/Toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const clickHandler = async () => {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
      .then((res) => (router.replace("/"), Toast("logged in", "success")))
      .catch((err) => Toast("failed", "error"));
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h3>Login Form</h3>
        <div className={styles.input}>
          <VscMail />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="text"
          />
        </div>
        <div className={styles.input}>
          <VscLock />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
        </div>

        <button onClick={clickHandler}>Login</button>
        <p>
          Dont have Account ?{" "}
          <span onClick={() => router.replace("/register")}>register</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
