import TextInput from "@/components/elements/TextInput";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Toast from "../../elements/Toast";
import styles from "./AuthPage.module.css";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
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
      <form className={styles.container} onSubmit={submitHandler}>
        <h3>Login Form</h3>
        <TextInput form={form} name="email" setForm={setForm} />
        <TextInput form={form} name="password" setForm={setForm} />
        <button type="submit">Login</button>
        <p>
          Dont have Account? <Link href="register">register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
