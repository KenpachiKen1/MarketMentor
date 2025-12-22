import jwt from "jsonwebtoken"


export function requireAuth(request, response) {
    const header = request.headers.authorization;

    if (!header) {
        response.status(401).json({ error: "Missing token" })
        return null
    }


    const token = header.replace("Bearer ", "");


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch {
          response.status(401).json({ error: "Invalid token" });
          return null;
    }


}