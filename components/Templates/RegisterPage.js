import { useState } from "react";
import axios from "axios";
import { VscMail, VscLock } from "react-icons/vsc";
import { useRouter } from "next/router";

import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const clickHandler = async () => {
    axios
      .post("/api/auth/register", { email, password })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
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
          have Account ?{" "}
          <span onClick={() => router.replace("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
