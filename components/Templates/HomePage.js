import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import axios from "axios";
import SortPart from "../elements/sortPart";

function HomePage() {
  const [todos, setTodos] = useState({});
  const fetchData = async () => {
    axios
      .get("api/todos")
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {todos && (
        <>
          <SortPart title="New" data={todos.new} fetchData={fetchData} />
          <SortPart
            title="In Progress"
            data={todos["in progress"]}
            fetchData={fetchData}
          />
          <SortPart title="Review" data={todos.review} fetchData={fetchData} />
          <SortPart title="Done" data={todos.done} fetchData={fetchData} />
        </>
      )}
    </div>
  );
}

export default HomePage;

