import { latest_news } from "../helpers/currents";

import { requireAuth } from "../auth";

export default async function latest(request, response) {
  try {
    const user = requireAuth(request, response);

    if (!user) {
      return;
    }

    const data = await latest_news();

    if (data) {
      return response.status(200).json(data);
    } else {
      return response.status(500).json({ error: data });
    }
  } catch (err) {
    return response.status(500).json({ error: err });
  }
}
