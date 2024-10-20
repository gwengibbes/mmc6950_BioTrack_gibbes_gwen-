import {getIronSession} from "iron-session";
import {sessionOptions} from "@/config/ironSession";

export default async function handler(req, res) {
    const session = await getIronSession(req, res, sessionOptions);
    session.destroy();
    res.redirect('/');
}

