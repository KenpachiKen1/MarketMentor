import { search_news, latest_news } from "../helpers/currents";

import { requireAuth } from "../auth";


export default async function news (request, response) {
    try {
        const user = requireAuth(request, response)

        if (request.method !== 'GET') {
            return response.stauts(405).json({error: "method not allowed"})
        }


        if (request.query.search) {
            const data = await search_news(request.query.search)

            if (!data) {
                return response.stauts(500).json({error: 'News Search Failed'})
            }

            return response.status(200).json(data);
        }


            const data = await latest_news();

            if (!data) {
              return response.stauts(500).json({ error: "News Search Failed" });
            }

            return response.status(200).json(data);
    } catch (err) {
        return response.status(500),json({error: "error"})
    }
}