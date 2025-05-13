import Link from "next/link";
import LoginForm from "../../../components/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h1>Sign in</h1>
      <LoginForm />
      <div>
        <h1>{`Don't have an account?`}</h1>
        <Link href="/register">Sign Up</Link>
      </div>
      <div>
        <h1>{`Forgot your password?`}</h1>
        <Link href="/forgot-password">Reset Password</Link>
      </div>
    </div>
  );
}
