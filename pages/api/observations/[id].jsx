export default function handler(req, res) {
    res.json({
        value: 'hi',
        id: req.query.id
    });
}