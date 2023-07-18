import axios from "axios";
import styles from "./Task.module.css";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import Toast from "./Toast";
import { useEffect, useState } from "react";

function Task({ title, status, description, _id, fetch }) {
  const [details, setDetails] = useState(false);

  const statuses = ["new", "in progress", "review", "done"];

  const index = statuses.findIndex((s) => s === status);

  const handler = async (id, status) => {
    axios
      .patch("/api/todos", { id, status, title })
      .then((res) => {
        Toast(`${title} status changed to ${status}`, "success");
        fetch();
      })
      .catch((err) => {
        Toast("failed", "error");

        console.log(err.response.data);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {title}
        <div className={styles.status}>{status}</div>
        <label
          htmlFor="menu"
          className={details ? `${styles.menu} ${styles.active}` : styles.menu}
          onClick={() => setDetails((prevState) => !prevState)}
        >
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div
        className={
          details ? `${styles.dropDown} ${styles.active}` : styles.dropDown
        }
      >
        {/* <div className={styles.description}> */}
        <div
          className={
            !details
              ? styles.description
              : `${styles.description} ${styles.active}`
          }
        >
          {description}
        </div>
        <span className={styles.line}></span>
        <div className={styles.buttons}>
          {index === 0 ? (
            <span></span>
          ) : (
            <button
              className={styles.backButton}
              onClick={() => handler(_id, statuses[index - 1], title)}
            >
              <VscChevronLeft /> {statuses[index - 1]}
            </button>
          )}
          {index === statuses.length - 1 ? (
            <span></span>
          ) : (
            <button
              className={styles.nextButton}
              onClick={() => handler(_id, statuses[index + 1], title)}
            >
              {statuses[index + 1]} <VscChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
