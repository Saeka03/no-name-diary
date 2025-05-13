import Link from "next/link";
import SignUpForm from "../../../components/SignUpForm";

export default function RegisterPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
      <div>
        <h1>{`You already have your account?`}</h1>
        <Link href="/login">Sign In</Link>
      </div>
    </div>
  );
}
