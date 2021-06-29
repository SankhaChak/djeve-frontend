const { events } = require("./data.json");

export default function handler(req, res) {
  if (req.method === "GET") return status(200).json(events);
  res.setHeader("Allow", ["GET"]);
  res.status(405).json({ message: `${req.method} method is not allowed` });
}
