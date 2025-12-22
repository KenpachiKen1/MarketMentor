import { search } from "../helpers/alpha";

import { requireAuth } from "../auth";

export default async function stockSearch(request, response) {
  try {
    const user = requireAuth(request, response);

    if (!user) {
      return;
    }

    const data = await search(request.query.ticker);

    if (!data) {
      return response.status(500).json({ error: data });
    }

    return response.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
}
