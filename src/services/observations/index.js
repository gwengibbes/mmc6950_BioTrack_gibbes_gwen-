import {Observations} from "@/models/observations";

export async function createObservation(observation) {
    console.log({observation})
    return (new Observations(observation)).save().then(res => {
        return res
    });
}

export async function getObservations() {
    return (await Observations.find({})).lean()
}

export async function getObservation(id) {
    return (await Observations.findOne({_id: id})).lean()
}

export async function getObservationsForUser(user) {
    return (await Observations.find({
        user: user._id
    })).lean()
}