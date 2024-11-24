"use client";
import {useEffect, useState} from "react";
import {Observations} from "@/components/observations";

async function getObservations() {
    const response = await fetch(`/api/observations`, {
        headers: {
            'content-type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

export default function LoggedObservations(props){

    const [loggedObservations, setLoggedObservations] = useState([]);

    useEffect(()=>{
        getObservations().then(res=>{
            setLoggedObservations(res);
        }).catch(err=>{
            console.log('Failed to update the list of logged observations');
        });
    }, [])

    return (
        <div>
            <h2>Your Observations ({loggedObservations.length})</h2>
            <Observations observations={loggedObservations} />
        </div>
    )
}