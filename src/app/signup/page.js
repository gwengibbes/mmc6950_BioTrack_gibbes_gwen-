'use client';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function SignUp(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    async function signUp(e){
        e.preventDefault();
        console.log('Signing up.')
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return false;
        }
        const response = await fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        router.push('/');
        return false;
    }

    return (
        <div>
            <Form onSubmit={signUp}>
                <FormGroup controlId='username'>
                    <FormLabel>Username</FormLabel>
                    <FormControl required  value={username} onChange={e => {setUsername(e.target.value)}} type='text'></FormControl>
                </FormGroup>
                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl required value={password} onChange={e => {setPassword(e.target.value)}} type='password'></FormControl>
                </FormGroup>
                <FormGroup controlId='confirmPassword'>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl required value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}} type='password'></FormControl>
                </FormGroup>
                <Button type={'submit'}>Sign Up </Button>
            </Form>
        </div>
    )
}