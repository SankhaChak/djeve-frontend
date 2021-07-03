import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { API_URL } from "@/config/index";
import { parseCookie } from "@/helpers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEventPage({ token }) {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some((txt) => txt === "");

    if (hasEmptyFields) {
      return toast.error(`Please fill out all the fields!`);
    }

    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        return toast.error(`You're not authorized to add an event!`);
      }
      toast.error(`Something went wrong! ☹`);
    } else {
      const event = await res.json();
      router.push(`/events/${event.slug}`);
    }
  };

  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a>{"<"} Go Back</a>
      </Link>
      <h1>Add Event</h1>

      <ToastContainer />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  return {
    props: {
      token,
    },
  };
}
