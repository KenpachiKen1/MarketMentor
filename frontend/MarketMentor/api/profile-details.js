import { getProfile } from "./helpers/User.js";

import { requireAuth } from "./auth.js";


export default async function get_profile(request, response) {
    const user = requireAuth(request, response);
    if (!user) return;
  const profile = await getProfile(user);

  if (!profile) {
    return response.status(500).json({ error: "Profile not found" });
  }

  return response.status(200).json(profile);
}
