import {Observations} from "@/models/observations";

export async function createObservation(observation) {
    return (new Observations(observation)).save().then(res => {
        return res
    });
}

// Get a list of all submitted observations
export async function getObservations(user) {
    const observations = await Observations.find({}).lean()
    observations.forEach(observation => {
        observation.isOwner = user._id === observation.user;
        if (!observation.location) {
            return;
        }
        const [lat, lng] = observation.location.split(',');
        observation.coordinates = {
            lat: Number(lat),
            lng: Number(lng),
        };
    });
    return observations;
}

// Get the location data only, from all submitted observations
export async function getObservationLocations() {

    const observations = await Observations.find({
        // Looking for all observations that has a location and matches the pattern of longitde and latitude values.
        // e.g. 10.508178,-61.3850892
        location: /^(-?)(\d+[.]\d+)[,](\s?)+(-?)(\d+[.]\d+)$/
    }).lean();

    // Update the format of the response to match what is required by the Google Maps component
    return observations.map(o => {
        const [lat, lng] = o.location.split(',');
        // The React component requires the data in the format: {lat: 10.508178, lng: -61.3850892 } This ensure that it is formatted that way
        return {
            lat: Number(lat),
            lng: Number(lng),
        }
    })
}

// Get only the observations submitted by the specified user
export async function getObservationsForUser(user) {
    return (await Observations.find({
        user: user._id
    }).lean()).map(obs => {
        // Ensure that the ID property is returned as a string
        obs._id = obs._id.toString();
        const [lat, lng] = obs.location.split(',');
        obs.coordinates = {
            lat: Number(lat),
            lng: Number(lng),
        };
        obs.isOwner = user._id === obs.user;
        return obs
    })
}

export function deleteObservation(id, user) {
    if(!id){
        return {};
    }
    return Observations.deleteOne({_id: id, user: user._id});
}