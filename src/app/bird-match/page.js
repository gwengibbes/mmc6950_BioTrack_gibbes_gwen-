'use client';
import {useEffect, useState} from "react";
import {Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import styles from './birdMatch.module.css';

export default function BirdMatch(props) {
    const [birdsToMatch, setBirdsToMatch] = useState([]);

    async function getBirdsToMatch() {
        const response = await fetch(`/api/bird-match-questions`, {
            headers: {
                'content-type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        setBirdsToMatch(await response.json());
    }

    useEffect(() => {
        console.log('Getting items...');
        getBirdsToMatch();
    }, [])


    async function submitAnswer(questionIndex, answerId) {

        const questionId = birdsToMatch[questionIndex]._id;
        const response = await fetch(`/api/bird-match-questions`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                action: 'check-answer',
                questionId,
                selectedAnswerId: answerId,
            })
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const resp = response.json().then(resp => {
            const updatedBirdsToMatch = [...birdsToMatch];
            updatedBirdsToMatch[questionIndex].answeredCorrectly = resp.isCorrect;
            setBirdsToMatch(updatedBirdsToMatch)
            console.log('...', resp)
        });
    }

    return (
        <div className={styles.page}>
            <Container>
                <Row>
                    <Col>
                        <div className='text-center'>
                            <h1>Welcome to Bird Match</h1>
                            <Row>
                                <Col md={{span:8, offset:2}}>
                                    Use this page to help you get familiar with more species of birds.
                                    Play the bird match games to see how many birds pictures you can match to their images.
                                </Col>
                            </Row>
                        </div>

                        <form className='mt-5'>
                            <Row>
                                {
                                    birdsToMatch.map((birdToMatch, idx) => {
                                        return <Col md='3' key={birdToMatch._id} className={styles.birdMatchQuestion}>
                                            {/*<img src={birdToMatch.image}/>*/}
                                            <div style={{backgroundImage: `url('${birdToMatch.image}')`}} className={styles.birdMatchImg}>

                                            </div>
                                            {
                                                birdToMatch.answers.map(opt => {
                                                    return <div key={opt._id}>
                                                        <Form.Check onChange={e => submitAnswer(idx, opt._id)}
                                                                    type='radio' id={"opt_" + opt._id}
                                                                    name={"q_" + birdToMatch._id}
                                                                    label={opt.title}></Form.Check>
                                                    </div>
                                                })
                                            }
                                            <div className={styles.answerResponse}>
                                            {
                                                birdToMatch.answeredCorrectly === true &&
                                                <div className='alert alert-success'>Well done!</div>
                                            }
                                            {
                                                birdToMatch.answeredCorrectly === false &&
                                                <div className='alert alert-danger'>Try Again!</div>
                                            }
                                            </div>
                                        </Col>
                                    })
                                }
                            </Row>

                            <div className='text-center'>
                                <button type='reset' className='btn btn-primary' onClick={getBirdsToMatch}>Replay
                                </button>
                            </div>

                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}