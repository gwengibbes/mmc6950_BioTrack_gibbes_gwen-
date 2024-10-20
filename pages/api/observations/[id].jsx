import {getObservationLocations} from "@/services/observations";

// Handle all API calls with a route matching /api/observations/:id
export default async function handler(req, res) {
    switch (req.method){
        case 'GET':
            // Ensure that the route exactly matches /api/observations/locations
            if(req.query.id === 'locations') {
                const locations = await getObservationLocations()
                return res.json(locations)
            }
            break;
    }
    return res.status(404);
}