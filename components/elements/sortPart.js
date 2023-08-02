//comps
import Task from "./Task";

//styles
import styles from "./sortPart.module.css";

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
          <p>loading ...</p>
        )}
      </div>
    </div>
  );
}

export default SortPart;
