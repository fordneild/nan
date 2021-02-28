import { sign } from "./jwt";

export function setRefreshToken(
    context: any,
    id: string,
    email: string,
    expiresIn = "30d"
) {
    context.setCookies.push({
        name: "refreshToken",
        value: sign(id, email, expiresIn),
        options: {
            // domain: "example.com",
            httpOnly: true,
            sameSite: true
        }
    });
}

export function clearRefreshToken(context: any) {
    context.setCookies.push({
        name: "refreshToken",
        value: "",
        options: {
            // domain: "example.com",
            httpOnly: true,
            sameSite: true
        }
    });
}

export function parseRefreshToken(req: any) {
    try {
        return req?.headers?.cookie?.split("=")[1];
    } catch (error) {
        return "";
    }
}
