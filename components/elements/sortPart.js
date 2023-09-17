//comps
import Task from "./Task";

//styles
import styles from "./sortPart.module.css";
import { ThreeDots } from "react-loader-spinner";

function SortPart({ title, data, fetchData }) {
  return (
    <div className={styles.sortContainer}>
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
