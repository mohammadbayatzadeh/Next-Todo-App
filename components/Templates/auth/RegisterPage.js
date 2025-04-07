import TextInput from "@/components/elements/TextInput";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Toast from "../../elements/Toast";
import styles from "./AuthPage.module.css";

function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/register", form)
      .then(
        () => (
          router.push("/login"),
          Toast("you registered successfully , please log in.", "success")
        )
      )
      .catch((err) => Toast(`${err.response.data.message}`, "error"));
  };

  return (
    <div className={styles.body}>
      <form className={styles.container} onSubmit={submitHandler}>
        <h3>Register Form</h3>
        <TextInput name="email" form={form} setForm={setForm} />
        <TextInput name="password" form={form} setForm={setForm} />
        <button type="submit">Register</button>
        <p>
          have Account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
