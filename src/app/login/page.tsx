import Link from "next/link";
import LoginForm from "../../components/LoginForm";
import styles from "./page.module.scss";
import { Yellowtail } from "next/font/google";

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
});

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <h1 className={`${styles.title} ${yellowtail.className}`}>
          No Name Diary
        </h1>
      </Link>
      <div className={styles.formContainer}>
        <h1 className={styles.login}>Login</h1>
        <div className={styles.line}></div>
        <LoginForm />
        <div className={styles.message}>
          {`Don't have an account? `}
          <Link href="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
