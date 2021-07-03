import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import { API_URL } from "@/config/index";
import { parseCookie } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";

export default function DashboardPage({ events }) {
  const deleteEvent = async (id) => {
    console.log(id);
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((event) => (
          <DashboardEvent
            event={event}
            key={event.id}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
