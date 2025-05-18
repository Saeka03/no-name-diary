// import Link from "next/link";
// import LoginForm from "../../components/LoginForm";

// export default function LoginPage() {
//   return (
//     <div>
//       <h1>Sign in</h1>
//       <LoginForm />
//       <div>
//         <h1>{`Don't have an account?`}</h1>
//         <Link href="/register">Sign Up</Link>
//       </div>
//     </div>
//   );
// }
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
