import { compareSync } from "bcrypt";
import { sign } from "../../lib/jwt";
import { setRefreshToken } from "../../lib/refreshToken";

const login = async (_: any, args: any, context: any, __: any) => {
    const session = context.driver.session();
    //find the user in the db
    return session
        .run(
            `
  MATCH (u:User {email: $email})
  RETURN u LIMIT 1
`,
            { email: args.email }
        )
        .then((res: any) => {
            session.close();
            try {
                // extract thier info
                const {
                    id,
                    email,
                    password: hashedPassword
                } = res.records[0].get("u").properties;
                // if thier password is correct
                if (!compareSync(args.password, hashedPassword)) {
                    throw new Error("Authorization Error");
                }
                //then they are valid 🥶 and they can have a auth token and refresh token
                setRefreshToken(context, id, email);
                return {
                    token: sign(id, email)
                };
            } catch (error) {
                throw new Error("Authorization Error");
            }
        });
};

export default login;
