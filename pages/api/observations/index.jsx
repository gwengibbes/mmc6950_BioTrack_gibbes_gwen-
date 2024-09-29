import {createObservation} from "@/services/observations";

export default async function handler(req, res) {
    console.log('Meth: ', req.method);
    switch (req.method){
        case 'GET':
            res.json(await getObservations());
            break;
        case 'POST':
            console.log('Creating...', {bod:req.body});
            res.status(201).json(await createObservation(req.body))
            break;
    }
    res.json({
        value: 'hi',
        id: req.query.id
    });
}