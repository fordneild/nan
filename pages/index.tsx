import React from "react";
import ProtectComponent from "../hoc/ProtectComponent";
import * as cookie from "cookie";

export default function Home(props: any) {
    return (
        <>
            {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
            <ProtectComponent>
                <h1>Home Page</h1>
            </ProtectComponent>
        </>
    );
}

// export async function getServerSideProps(context: any) {
//     // const cookie2 = context.req.getHeader("Cookie");
//     // const parsedCookies = cookie.parse(context.req.headers.cookie || "");
//     return { props: { context } };
// }
