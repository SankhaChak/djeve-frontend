const { events } = require("./data.json");

export default function handler(req, res) {
  const event = events.filter((ev) => ev.slug === req.query.slug);

  if (req.method === "GET") return res.status(200).json(event);
  res.setHeader("Allow", ["GET"]);
  res.status(405).json({ message: `${req.method} method is not allowed` });
}
