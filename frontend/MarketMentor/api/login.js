import { login } from "./helpers/User.js";

export default async function login_account(request, response) {
  const data = await login(request, response);
    return response.status(200).json(data);
}
