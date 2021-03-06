import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const user = { email, password };

    const hasEmptyFields = Object.values(user).some((txt) => txt === "");

    if (hasEmptyFields) {
      return toast.error(`Please fill all the fields`);
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      return toast.error(`Please enter a valid email`);
    }

    await login(user);

    if (error) {
      toast.error(error);
    }
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          {"Don't have an account ?"}{" "}
          <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
}
