//comps
import axios from "axios";
import Task from "./Task";

//styles
import styles from "./sortPart.module.css";
import { ThreeDots } from "react-loader-spinner";
import Toast from "./Toast";

function SortPart({ title, data, fetchData }) {
  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drop = (ev) => {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text/html"));
    if (data.status !== title) {
      axios
        .patch("/api/todos", { id: data.id, status: title })
        .then(() => {
          Toast(`${title} status changed to ${title}`, "success");
          fetchData();
        })
        .catch(() => {
          Toast("failed", "error");
        });
    }
  };

  return (
    <div className={styles.sortContainer} onDrop={drop} onDragOver={allowDrop}>
      <div className={styles.sortTitle}>{title}</div>
      <div className={styles.tasks}>
        {data ? (
          data[title]?.length ? (
            data[title].map((todo) => (
              <Task key={todo._id} {...todo} fetch={fetchData} />
            ))
          ) : (
            <p>There is no {title} todo</p>
          )
        ) : (
          <div className={styles.loading}>
            <ThreeDots color="#6a7efc" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SortPart;
