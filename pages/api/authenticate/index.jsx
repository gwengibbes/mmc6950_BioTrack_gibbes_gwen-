import {validateCredentials} from '@/services/users';
import {getIronSession} from 'iron-session'
import {sessionOptions} from '@/config/ironSession'
import {adminUserNames} from '@/config/admins';

export default async function handler(req, res) {
    switch (req.method){
        case 'POST':
            const {username, password} = req.body;
            if(!username || !password) {
                // The user must enter a user name and a password
                return res.status(400).json({error: 'Username and password is required'});
            }
            const loggedInUser = await validateCredentials(username, password);
            if(!loggedInUser){
                // When the username and password combination does not match
                return res.status(401).json({error: 'Invalid username and password'});
            }
            // Create a session once the user login is successful
            const session = await getIronSession(req, res, sessionOptions);
            session.username = loggedInUser.username;
            session.userId = loggedInUser._id;
            session.user = loggedInUser;
            // Check whether the user is on the list of anmin users and set a flag on the session
            session.isAdmin = adminUserNames.indexOf(loggedInUser.username)>=0;
            await session.save();
            res.status(200).json(loggedInUser);
            break;
        default:
            res.status(404).json({});
    }
}