import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

//icons
import { VscMail, VscLock } from "react-icons/vsc";

//styles
import styles from "./AuthPage.module.css";

//elements
import Toast from "../../elements/Toast";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const clickHandler = async () => {
    axios
      .post("/api/auth/register", { email, password })
      .then((res) => (router.push("/login"), Toast("logged in", "success")))
      .catch((err) => Toast(`${err.response.data.message}`, "error"));
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h3>Register Form</h3>
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

        <button onClick={clickHandler}>Register</button>
        <p>
          have Account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
