import {BirdMatchQuestions} from "@/models/birdMatchQuestions";

export async function getRandomQuestions(limit = 5) {
    const docs = await BirdMatchQuestions.countDocuments().lean()
    console.log('Total docs: ', docs)
    let r = 0.5;
    if (docs < (2 * limit)) {
        r = 0;
    }
    return BirdMatchQuestions.find({
        $expr: {$lt: [r, {$rand: {}}]}
    }).limit(limit).lean();
}

export async function isAnswerCorrect(questionId, selectedAnswerId) {
    const doc = await BirdMatchQuestions.find({
        _id: questionId,
        answers: {$elemMatch: {_id: selectedAnswerId, isCorrect: true}}
    }).lean();
    const isCorrect = doc?.length >= 1;
    return {isCorrect};
}