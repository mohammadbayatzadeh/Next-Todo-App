import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

//styles
import styles from "./Layout.module.css";
import "aos/dist/aos.css";

//icons
import { VscListSelection, VscPerson, VscIndent } from "react-icons/vsc";
import { GiArchiveRegister } from "react-icons/gi";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import Sun from "../icons/Sun";
import Moon from "../icons/Moon";
import AOS from "aos";

function Layout({ children }) {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 300,
      easing: "ease-in",
      delay: 100,
    });
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  const themeHandler = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  const { status } = useSession();
  return (
    <div className={styles.main_container} id={[theme]}>
      <Head>
        <link rel="icon" href="/Logo.png" />
      </Head>
      <header className={styles.header}>
        <Link href="/">Todo App</Link>
        <span onClick={themeHandler}>
          {theme === "light" ? <Sun /> : <Moon />}
        </span>
        <div style={{ marginLeft: "auto" }}></div>
        {status === "authenticated" ? (
          <button onClick={() => signOut()} className={styles.button}>
            <IoIosLogOut />
            <p>Logout</p>
          </button>
        ) : (
          <>
            <button
              onClick={() => router.replace("/register")}
              className={styles.button}
            >
              <GiArchiveRegister />
              <p>register</p>
            </button>
            <button
              onClick={() => router.replace("/login")}
              className={styles.button}
            >
              <IoIosLogIn />
              <p>login</p>
            </button>
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
