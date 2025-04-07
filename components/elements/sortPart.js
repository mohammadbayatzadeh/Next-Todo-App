import axios from "axios";
import Task from "./Task";
import Toast from "./Toast";
import styles from "./sortPart.module.css";

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
          Toast("failed", "something went wrong!!!");
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
          <div className={styles.loading}>Loading</div>
        )}
      </div>
    </div>
  );
}

export default SortPart;
