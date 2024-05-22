// pages/api/localStorage.js

import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession();
    console.log(session);

    const username =
        session?.user?.email
            ? session.user.email.substring(0, session.user.email.indexOf("@"))
            : "guest";

    res.status(200).json({ username });
}
