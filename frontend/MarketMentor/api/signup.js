import { signup } from "./helpers/User.js";

export default async function create_account(request, response) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  try {
    const data = await signup(request);

    if (!data) {
      return response.status(400).json({ error: "Account creation failed" });
    }

    return response.json(data);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Signup failed" });
  }
}
