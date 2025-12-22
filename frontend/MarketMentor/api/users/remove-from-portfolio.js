import { removeFromPortfolio } from "../../../../backend/User";
import { requireAuth } from "../auth";


export default async function removeFromPort(request, response) {
  const user = requireAuth(request, response);

  const ticker = request.body.ticker;
  const company = request.body.company;

  try {
    const data = await removeFromPortfolio(user, company, ticker);
    return response.status(201).json(data);
  } catch {
    return response.status(500).json({ error: "Failed to add to portfolio" });
  }
}