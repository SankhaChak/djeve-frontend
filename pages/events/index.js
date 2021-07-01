import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {!events.length && <h3>No events to show</h3>}
      {events.map((ev) => (
        <EventItem key={ev.id} event={ev} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start point
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Req to get events for a particular page
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  // Req to get the total number of events for pagination
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  return { props: { events, page: +page, total } };
}
