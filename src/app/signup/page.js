'use client';
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import styles from './signup.module.css';

export default function SignUp(props) {
    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    async function signUp(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        const response = await fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                ageGroup,
                emailAddress,
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        if (!response.ok) {
            const json = await response.json();
            alert(json.error);
        }
        console.log('Oops!')
        const json = await response.json();
        router.push('/');
        return false;
    }

    return (
        <div className={styles.page}>
            <Container>
                <Row>
                    <Col sm='12'>
                        <h1 className="text-center">Sign Up</h1>
                        <div className="text-center">Join BioTrack Today!</div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8} className={'offset-sm-2'}>
                        <Form onSubmit={signUp}>
                            <FormGroup controlId='username' className='mb-4'>
                                <FormLabel>Username</FormLabel>
                                <FormControl required value={username} onChange={e => {
                                    setUsername(e.target.value)
                                }} type='text'></FormControl>
                            </FormGroup>
                            <FormGroup controlId='emailAddress' className='mb-4'>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl required value={emailAddress} onChange={e => {
                                    setEmailAddress(e.target.value)
                                }} type='email'></FormControl>
                            </FormGroup>
                            <FormGroup controlId='ageGroup' className='mb-4'>
                                <FormLabel>Age Group</FormLabel>
                                <FormSelect value={ageGroup} onChange={e => {
                                    setAgeGroup(e.target.value)
                                }}>
                                    <option value="">Select An Age Group</option>
                                    <option>11-20</option>
                                    <option>21-29</option>
                                    <option>31-39</option>
                                    <option>41-49</option>
                                    <option>51-59</option>
                                    <option>61-69</option>
                                    <option>71-79</option>
                                    <option>81-89</option>
                                    <option>91-99</option>
                                </FormSelect>
                            </FormGroup>
                            <FormGroup controlId='password' className='mb-4'>
                                <FormLabel>Password</FormLabel>
                                <FormControl required value={password} onChange={e => {
                                    setPassword(e.target.value)
                                }} type='password'></FormControl>
                            </FormGroup>
                            <FormGroup controlId='confirmPassword' className='mb-4'>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl required value={confirmPassword} onChange={e => {
                                    setConfirmPassword(e.target.value)
                                }} type='password'></FormControl>
                            </FormGroup>
                            <div className={'text-center'}>
                                <Button variant={"primary"} type={'submit'}>Sign Up</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}