import Link from "next/link";
import {
  VscListSelection,
  VscPerson,
  VscIndent,
  VscReply,
} from "react-icons/vsc";

import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.main_container}>
      <header className={styles.header}>
        <p>Todo App Project</p>
      </header>
      <div className={styles.container}>
        <input type="checkbox" id="hamburger" name="hamburger" />
        <label htmlFor="hamburger" className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </label>
        <aside className={styles.aside}>
          <p>Welcome</p>
          <ul>
            <li>
              <VscListSelection /> <Link href="/">Todos</Link>
            </li>
            <li>
              <VscIndent /> <Link href="/add-todo">Add Todo</Link>
            </li>
            <li>
              <VscPerson /> <Link href="/profile">profile</Link>
            </li>
          </ul>
        </aside>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
