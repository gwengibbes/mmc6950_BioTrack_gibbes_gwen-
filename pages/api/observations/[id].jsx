import {getObservationLocations, deleteObservation} from "@/services/observations";
import {getIronSession} from "iron-session";
import {sessionOptions} from "@/config/ironSession";

// Handle all API calls with a route matching /api/observations/:id
export default async function handler(req, res) {
    const session = await getIronSession(req, res, sessionOptions);
    switch (req.method){
        case 'GET':
            // Ensure that the route exactly matches /api/observations/locations
            if(req.query.id === 'locations') {
                const locations = await getObservationLocations()
                return res.json(locations)
            }
            break;
        case 'DELETE':

            const {user } = session
            res.json(await deleteObservation(req.query.id, user));
            break;
    }
    return res.status(404);
}