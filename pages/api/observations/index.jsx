import {createObservation, getObservations, getObservationsForUser} from "@/services/observations";
import {getIronSession} from 'iron-session'
import {sessionOptions} from '@/config/ironSession'

export default async function handler(req, res) {
    const session = await getIronSession(req, res, sessionOptions);
    const {user, userId} = session
    switch (req.method){
        case 'GET':
            let observations;
            // When the URL matches: /api/observations?view=all this means that an admin is attempting to review all observations
            if(req.query.view === 'all' && session.isAdmin){
                // Once the user is an admin, return all submitted observations
                observations = await getObservations(user);
            } else {
                if(!user){
                    // When the user is not logged in, do not return any data
                    observations = []
                } else {
                    // When the user is logged in, only return data belonging to them
                    observations = await getObservationsForUser(user);
                }
            }
            res.json(observations)
            break;
        case 'POST':
            // Create an observation
            res.status(201).json(await createObservation({...req.body, user: userId}))
            break;
    }
}