import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";

export default function Login(props) {
    const router = useRouter();
    // State variable to store and use the input from the user
    const [{username, password}, setForm] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    // Event handler to update the state variable as the user enters values
    function handleChange(fieldName) {
        return(e) =>{
            setForm({
                username,
                password,
                [fieldName]: e.target.value,
            });
        }


    }

    // Function to call the API to log the user in
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/authenticate", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });
            if (res.status === 200) {
                router.push("/");
                window.location.reload();
            }
            const {error: message} = await res.json();
            setError(message);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Form onSubmit={handleLogin} className={'form form-inline'}>
                <Row>
                    <Col md={5}>
                        <FormGroup controlId='username'>
                            {/*<FormLabel>Username:</FormLabel>*/}
                            <FormControl placeholder='Username' type='text' required onChange={handleChange('username')} value={username}/>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup controlId='password'>
                            {/*<FormLabel>Password:</FormLabel>*/}
                            <FormControl placeholder='Password' type='password' required onChange={handleChange('password')} value={password}/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <div className="d-grid gap-2">
                            <Button variant={'primary'} size={'lg'} type='submit'>Login</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            {error && <p className={'alert alert-danger mt-2'}>{error}</p>}
        </div>
    );
}