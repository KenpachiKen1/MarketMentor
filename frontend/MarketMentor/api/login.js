import { login } from "../../../backend/User";


export default async function login_account(request, response) {
    const data = await login(request, response);
    return data;
}

