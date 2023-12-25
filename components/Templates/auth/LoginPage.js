import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

//functions
import { signIn } from "next-auth/react";

//styles
import styles from "./AuthPage.module.css";

//elements
import Toast from "../../elements/Toast";
import TextInput from "@/components/elements/TextInput";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const clickHandler = async () => {
    await signIn("credentials", {
      ...form,
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
        <TextInput form={form} name="email" setForm={setForm} />
        <TextInput form={form} name="password" setForm={setForm} />
        <button onClick={clickHandler}>Login</button>
        <p>
          Dont have Account? <Link href="register">register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
