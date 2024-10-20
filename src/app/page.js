'use client';
import Image from "next/image";
import Link from "next/link";
import {Button} from "react-bootstrap";
import {AdvancedMarker, APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {useEffect, useState} from "react";

export default function Home() {

    /* API KEY for Google Maps. This was generated from https://console.cloud.google.com/ to be able to use the Google
        maps feature.
    */
    const API_KEY = 'AIzaSyBINQ12s2muvZrBKDnvVwKpammt1TdFtc0';

    // Set up a variable to display the list of locations
    const [observationLocations, setObservationLocations] = useState([]);

    // Fetch the list of reported observations with a location.
    async function getObservationLocations() {
        const response = await fetch(`/api/observations/locations`, {
            headers: {
                'content-type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
    }

    useEffect(()=>{
        getObservationLocations().then(locations =>{
            setObservationLocations(locations);
        })
    }, [])



    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1>BioTrack</h1>

                <div>
                    BioTrack is an application that assists in gathering data by tracking animal sightings in documented
                    locations. For this project, birds will be the first species that the web application will be
                    developed for.
                    The application employs a user-friendly format to receive and compile data on bird species. Using
                    this
                    application allows the user to be a part of solving the problem of the endangered biodiversity
                    across the
                    world.
                </div>
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <Link className='btn btn-lg btn-outline-dark' href='/add-observation'>Add Observation</Link>
                </div>

                <h3 className={'text-center'}>Current Observations</h3>
                <div style={{display: "table", margin: '0 auto'}}>

                    {/* Use a Google Maps component to render a Google Map with pins */}
                    <APIProvider apiKey={API_KEY}>
                        {/*
                            Documentation: https://visgl.github.io/react-google-maps/docs/api-reference/components/api-provider
                            */}
                        <Map
                            style={{width: '50vw', height: '400px'}}
                            defaultCenter={{lat: 22.54992, lng: 0}}
                            defaultZoom={2}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                        >
                            {/*
                            Documentation: https://visgl.github.io/react-google-maps/docs/api-reference/components/marker

                            Display the list of locations that we recieve from the database as pins/markers on the map
                            */}
                            {observationLocations.map(observationLocation => <Marker position={observationLocation}/>)}
                        </Map>
                    </APIProvider>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
