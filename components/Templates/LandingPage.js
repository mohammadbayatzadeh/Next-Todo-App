import Image from "next/image";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.content}>
          <h2 data-aos="fade-right">Todo</h2>
          <h2 data-aos="fade-right">Todo app</h2>
          <p data-aos="fade-left">
            A powerful task management software for busy professionals. With
            tools to help tame the chaos, you can focus on the right tasks at
            the right time.
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <Image
          src={require("../../public/images/landing.png")}
          width={500}
          height={700}
          alt="landingPage"
          className={styles.imgUp}
        />
        <Image
          src={require("../../public/images/landing-2.png")}
          width={1050}
          height={700}
          alt="landingPage"
          className={styles.imgDown}
        />
      </div>
    </div>
  );
}

export default LandingPage;
