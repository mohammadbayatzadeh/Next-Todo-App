import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//elements
import Toast from "../elements/Toast";

//styles
import styles from "./ProfilePage.module.css";

//icons
import { VscAccount } from "react-icons/vsc";

function ProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setPassword("");

    axios
      .get("/api/profile")
      .then((res) => {
        const { firstName, lastName } = res.data.data;
        setFirstName(firstName);
        setLastName(lastName);
      })
      .catch((err) => {});
  }, []);

  const submitHandler = async () => {
    axios
      .post("/api/profile", {
        firstName,
        lastName,
        password,
      })
      .then((res) => {
        Toast("info updated", "success");
        setFirstName("");
        setLastName("");
        setPassword("");
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
      <div className={styles.form}>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">lastName:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="password">password:</label>
        <input
          id="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} onClick={submitHandler}>
          Update
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
