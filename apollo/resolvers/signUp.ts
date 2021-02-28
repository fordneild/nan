import { hash } from "bcrypt";
import { sign } from "../../lib/jwt";
import { setRefreshToken } from "../../lib/refreshToken";
const signUp = async (_: any, args: any, context: any, __: any) => {
    args.password = await hash(args.password, 10);
    const session = context.driver.session();
    return session
        .run(
            `
WITH randomUUID() as id
CREATE (u:User) SET u += $args, u.username = id, u.id = id, u.createdAt = datetime()
RETURN u
`,
            { args }
        )
        .then((res: any) => {
            session.close();
            const { id, email } = res.records[0].get("u").properties;
            //then they are valid 🥶 and they can have a auth token and refresh token
            setRefreshToken(context, id, email);
            return {
                token: sign(id, email)
            };
        });
};

export default signUp;
