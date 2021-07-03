import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Event.module.css";

export default function EventDetailPage({ event }) {
  if (!event) return <>Loading...</>;

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>
        <h1>{event.name}</h1>

        {event.image && (
          <div className={styles.image}>
            <Image
              alt={event.name}
              src={event.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers: </h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((ev) => ({ params: { slug: ev.slug } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL}/events?slug=${params.slug}`);
  const event = await res.json();

  return { props: { event: event[0], revalidate: 1 } };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const event = await res.json();

//   return { props: { event: event[0] } };
// }
