import axios from "axios";
import Link from "next/link";
import { useState } from "react";

//styles
import styles from "./Task.module.css";

//icons
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { AiFillEdit, AiOutlineDelete, AiFillCaretDown } from "react-icons/ai";

//comps
import Toast from "./Toast";

function Task({ title, status, description, _id, fetch }) {
  const [details, setDetails] = useState(false);
  const statuses = ["new", "in progress", "review", "done"];

  const index = statuses.findIndex((s) => s === status);

  const handler = async (id, status) => {
    axios
      .patch("/api/todos", { id, status })
      .then(() => {
        Toast(`${title} status changed to ${status}`, "success");
        fetch();
      })
      .catch(() => {
        Toast("failed", "error");
      });
  };

  const deleteHandler = async () => {
    axios
      .delete("/api/" + _id)
      .then(() => {
        Toast(`${title} todo deleted`, "success");
        fetch();
      })
      .catch(() => {
        Toast("failed", "error");
      });
  };

  const drag = (ev) => {
    ev.dataTransfer.setData("text/html", ev.target.id);
  };

  return (
    <div
      className={styles.container}
      draggable={true}
      onDragStart={drag}
      id={_id}
    >
      <div className={styles.title}>
        <div className={styles.titleText}>{title}</div>
        <div className={styles.status}>{status}</div>
        <span
          className={details ? `${styles.menu} ${styles.active}` : styles.menu}
          onClick={() => setDetails((prevState) => !prevState)}
        >
          <AiFillCaretDown />
        </span>
        <Link href={`/edit/${_id}`}>
          <AiFillEdit />
        </Link>

        <AiOutlineDelete onClick={deleteHandler} />
      </div>

      <div
        className={
          details ? `${styles.dropDown} ${styles.active}` : styles.dropDown
        }
      >
        <div
          className={
            !details
              ? styles.description
              : `${styles.description} ${styles.active}`
          }
        >
          <p>{title}</p>
          <p>{description}</p>
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
