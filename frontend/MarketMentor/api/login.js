import { login } from "./helpers/User";

export default async function login_account(request, response) {
  const data = await login(request, response);
  return data;
}
