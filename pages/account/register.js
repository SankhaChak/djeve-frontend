import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error } = useContext(AuthContext);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (password !== passwordConfirm) {
      return toast.error(`Passwords do not match`);
    }

    const user = { username, email, password };

    const hasEmptyFields = Object.values(user).some((txt) => txt === "");

    if (hasEmptyFields) {
      return toast.error(`Please fill all the fields`);
    }

    register(user);

    error && toast.error(error);
  };

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
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
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={({ target }) => setPasswordConfirm(target.value)}
            />
          </div>

          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Already have an account ? <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}
