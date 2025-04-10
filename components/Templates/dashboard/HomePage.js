import axios from "axios";
import { useEffect, useState } from "react";
import SortPart from "../../elements/sortPart";
import styles from "./HomePage.module.css";

function HomePage() {
  const [todos, setTodos] = useState();
  const fetchData = async () => {
    axios
      .get("api/todos")
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <SortPart title="new" data={todos} fetchData={fetchData} />
      <SortPart title="in progress" data={todos} fetchData={fetchData} />
      <SortPart title="review" data={todos} fetchData={fetchData} />
      <SortPart title="done" data={todos} fetchData={fetchData} />
    </div>
  );
}

export default HomePage;
