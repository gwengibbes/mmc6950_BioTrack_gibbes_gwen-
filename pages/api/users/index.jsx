import {createAccount} from '@/services/users';
import {getIronSession} from 'iron-session'
import {sessionOptions} from '@/config/ironSession'
import {adminUserNames} from "@/config/admins";

export default async function handler(req, res) {
    switch (req.method){
        case 'POST':
            const {username, password,emailAddress, ageGroup} = req.body;
            if(!username || !password) {
                res.status(400).json({error: 'Username and password is required'});
            }
            try {
                const userAccount = await createAccount(username, password, emailAddress, ageGroup);
                const session = await getIronSession(req, res, sessionOptions);
                session.username = userAccount.username;
                session.userId = userAccount._id;
                session.user = userAccount;
                session.isAdmin = adminUserNames.indexOf(userAccount.username) >= 0;
                await session.save();
                res.status(201).json(userAccount);
            } catch(err){
                console.log(err)
                if(err.code === 11000){
                    res.status(400).json({error: `The specified username is not available`});
                    return;
                }
                res.status(400).json({error: `Failed to create the account: ${err.message}`});
            }

            break;
        default:
            res.status(494).json({});
    }
}