import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export function verify(token: string) {
    return jwt.verify(token, secret);
}

export function sign(id: string, email: string, expiresIn = "15m") {
    return jwt.sign({ email, id }, secret, {
        expiresIn: expiresIn
    });
}
