import {getRandomQuestions, isAnswerCorrect} from "@/services/bird-match-questions";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const questions = await getRandomQuestions(4)
            res.json(questions);
            break;
        case 'POST':
            if(req.body.action === 'check-answer'){
                const {questionId, selectedAnswerId} = req.body;
                const result = await isAnswerCorrect(questionId, selectedAnswerId);
                return res.json(result);
            }
            res.status(404);
            break;
    }
}