import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

//styles
import styles from "./Layout.module.css";
import { VscListSelection, VscPerson, VscIndent } from "react-icons/vsc";
import Head from "next/head";

function Layout({ children }) {
  const router = useRouter();
  const { status } = useSession();
  return (
    <div className={styles.main_container}>
      <Head>
        <link rel="icon" href="/Logo.png" />
      </Head>
      <header className={styles.header}>
        <p>Todo App Project</p>
        <div style={{ marginLeft: "auto" }}></div>
        {status === "authenticated" ? (
          <button onClick={() => signOut()}>Logout</button>
        ) : (
          <>
            <button onClick={() => router.replace("/register")}>
              register
            </button>
            <button onClick={() => router.replace("/login")}>login</button>
          </>
        )}
      </header>
      <div className={styles.container}>
        {status === "authenticated" && (
          <>
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
          </>
        )}
        {status === "authenticated" ? (
          <div className={styles.body}>{children}</div>
        ) : (
          <div className={styles.subBody}>{children}</div>
        )}
      </div>
    </div>
  );
}

export default Layout;
