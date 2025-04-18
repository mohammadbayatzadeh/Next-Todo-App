import TextInput from "@/components/elements/TextInput";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import Toast from "../../elements/Toast";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((res) => {
        const { firstName, lastName } = res.data.data;
        setForm({ firstName, lastName, password: "" });
      })
      .catch((err) => {});
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .post("/api/profile", form)
      .then(() => {
        Toast("info updated", "success");
        setForm({ firstName: "", lastName: "", password: "" });
        router.replace("/");
      })
      .catch((err) => {
        Toast(`${err.response.data.message}`, "error");
      });
  };
  return (
    <div className={styles.container}>
      <h3>
        <VscAccount />
        update profile
      </h3>
      <form className={styles.form} onSubmit={submitHandler}>
        <TextInput
          form={form}
          setForm={setForm}
          name="firstName"
          type="dashboard"
        />
        <TextInput
          form={form}
          setForm={setForm}
          name="lastName"
          type="dashboard"
        />
        <TextInput
          form={form}
          setForm={setForm}
          name="password"
          type="dashboard"
        />

        <button className={styles.button} type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
