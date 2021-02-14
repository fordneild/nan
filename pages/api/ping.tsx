// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

export type PingResponse = {
    message: string;
};

export const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<PingResponse>
) => {
    res.status(200).json({
        message: `Back-end API is online at ${Date.now()}`
    });
};

export default handler;
