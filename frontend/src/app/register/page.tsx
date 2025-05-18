import Link from "next/link";
import SignUpForm from "../../components/SignUpForm";
import styles from "./page.module.scss";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.signUp}>Sign Up</h1>
        <div className={styles.line}></div>
        <SignUpForm />
        <div className={styles.message}>
          {`Already have an account? `}
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
