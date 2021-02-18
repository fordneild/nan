import { clearRefreshToken } from "../../util/refreshToken";
const logout = async (_: any, __: any, context: any, ____: any) => {
    try {
        clearRefreshToken(context);
        return { ok: true };
    } catch (error) {
        console.log("error while logging out:" + error);
        return { ok: false };
    }
};

export default logout;
