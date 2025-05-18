import Link from "next/link";
import LoginForm from "../../components/LoginForm";
import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.container}>
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
