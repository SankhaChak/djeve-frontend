import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Event.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function EventDetailPage({ event }) {
  const router = useRouter();

  const deleteEvent = async () => {
    if (confirm("Are you sure ?")) {
      const res = await fetch(`${API_URL}/events/${event.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>
        <h1>{event.name}</h1>

        <ToastContainer />

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
