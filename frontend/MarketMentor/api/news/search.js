import { search_news } from "../../../../backend/currents";
import { requireAuth } from "../auth";


export default async function search(request, response) {
    try {

          const user = requireAuth(request, response);

          if (!user) {
            return;
          }

      const data = await search_news(request.query.search);

      if (data) {
        return response.status(200).json(data);
      } else {
        return response.status(500).json({ error: data });
      }
    } catch (err) {
      return response.status(500).json({ error: err });
    }
}