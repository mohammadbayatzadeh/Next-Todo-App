import Task from "./Task";
import styles from "./sortPart.module.css";

function SortPart({ title, data, fetchData }) {
  return (
    <div className={styles.sortContainer}>
      <div className={styles.sortTitle}>{title}</div>
      <div className={styles.tasks}>
        {data?.length ? (
          data.map((todo) => (
            <Task key={todo._id} {...todo} fetch={fetchData} />
          ))
        ) : (
          <p>There is no {title} todo</p>
        )}
      </div>
    </div>
  );
}

export default SortPart;
