import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

//icons
import { VscMail, VscLock } from "react-icons/vsc";

//functions
import { signIn } from "next-auth/react";

//styles
import styles from "./AuthPage.module.css";

//elements
import Toast from "../../elements/Toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const clickHandler = async () => {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((res) => {
      if (res.ok) {
        router.push("/todos");
        Toast("logged in", "success");
        return;
      } else {
        Toast(`${res.error}`, "error");
      }
    });
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
          Dont have Account? <Link href="register">register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
