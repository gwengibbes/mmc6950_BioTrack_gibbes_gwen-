import {getIronSession} from "iron-session";
import {sessionOptions} from "@/config/ironSession";

export async function getServerSideProps({ req, res }) {
    const session = await getIronSession(req, res, sessionOptions);
    let user;
    console.log('Session; ', session)
    if(session.userId){
        user={
            username: session.username
        }
    }
    console.log('Logged in?', !!session.userId)
    const props = {
        user,
        isLoggedIn: !!session.userId
    };
    return {props}
}

export default function NavBar(props){

    return (<div>
        This is the Nav Bar!
    </div>)
}