import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/home.module.css";
import { useRouter } from "next/router";
import AuthStatus from "@/components/AuthStatus";
import NavBar from "../components/NavBar";

export default function Login(props) {
    const router = useRouter();
    // State variable to store and use the input from the user
    const [{ username, password }, setForm] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    // Event handler to update the state variable as the user enters values
    function handleChange(e) {
        setForm({ username, password, ...{ [e.target.name]: e.target.value } });
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
                body: JSON.stringify({ username, password }),
            });
            if (res.status === 200) return router.push("/");
            const { error: message } = await res.json();
            setError(message);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Login | BioTrack</title>
                <meta name="description" content="Login to your BioTrack account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar/>
            <AuthStatus/>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to the Login Page! {}
                </h1>

                <form
                    className={[styles.card, styles.form].join(" ")}
                    onSubmit={handleLogin}
                >
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        value={username}
                    />
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={password}
                    />
                    <button type='submit'>Login</button>
                    {error && <p>{error}</p>}
                </form>
                <Link href="/signup">
                    <p>Sign up instead?</p>
                </Link>
            </main>
        </div>
    );
}