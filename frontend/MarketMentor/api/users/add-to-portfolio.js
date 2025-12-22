import { addToPortfolio } from "../helpers/User.js"

import { requireAuth } from "../auth.js";
export default async function addtoPort(request, response) {

    const user = requireAuth(request, response)

    const ticker = request.body.ticker;
    const company = request.body.company;

    try {
      const data = await addToPortfolio(user, company, ticker);
      return response.status(201).json(data);
    } catch {
      return response.status(500).json({ error: "Failed to add to portfolio" });
    }
  
}
