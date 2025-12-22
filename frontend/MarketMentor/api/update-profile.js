import { updateProgress } from "./helpers/User";

export default async function update_profile(request, response) {
  const user = request.user;
  const profile = await updateProgress(user);

  if (!profile) {
    return response.status(500).json({ error: "Profile not found" });
  }

  return response.status(200).json(profile);
}
