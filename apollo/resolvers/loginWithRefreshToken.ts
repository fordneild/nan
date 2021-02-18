import { sign, verify } from "../../util/jwt";
import { setRefreshToken } from "../../util/refreshToken";

export default async function loginWithRefreshToken(
    req: any,
    args: any,
    context: any,
    info: any
) {
    try {
        const { refreshToken } = context;
        const decoded = verify(refreshToken);
        // @ts-expect-error, we just decrpted it, no way it knows what properities it has on the object
        const id = decoded?.id;
        // @ts-expect-error, we just decrpted it, no way it knows what properities it has on the object
        const email = decoded?.email;
        setRefreshToken(context, id, email);
        return {
            token: sign(id, email)
        };
    } catch (error) {
        throw new Error("Authorization Error");
    }
}
