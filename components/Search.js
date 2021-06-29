import styles from "@/styles/Search.module.css";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

export default function Search() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search Events"
          type="text"
          value={term}
          onChange={({ target }) => setTerm(target.value)}
        />
      </form>
    </div>
  );
}
