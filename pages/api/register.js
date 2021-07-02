import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async function login(req, res) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // Set Cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 1 Week
          sameSite: "strict",
          path: "/",
        })
      );

      return res.status(200).json({ user: data.user });
    }

    return res
      .status(data.statusCode)
      .json({ message: data.message[0].messages[0].message });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `${req.method} method not allowed!` });
  }
}
