import { getProfile } from "./helpers/User.js";

export default async function get_profile(request, response) {
  const user = request.user;
  const profile = await getProfile(user);

  if (!profile) {
    return response.status(500).json({ error: "Profile not found" });
  }

  return response.status(200).json(profile);
}
