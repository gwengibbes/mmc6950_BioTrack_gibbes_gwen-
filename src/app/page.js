'use client';
import Image from "next/image";
import Link from "next/link";
import {Button, Col, Container, Row} from "react-bootstrap";
import {AdvancedMarker, APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {useEffect, useState} from "react";
import Login from "@/components/login/login";
import styles from './home.module.css';

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

    useEffect(() => {
        getObservationLocations().then(locations => {
            setObservationLocations(locations);
        })
    }, [])


    return (
        <div>
            <div className={styles.homepage}>
                <Container>
                    <Row className='pt-5 pb-5'>
                        <Col md={6}>
                            <img className={styles.logo_small + ' mb-5'} src={'/images/logo-sm.png'}/>
                            <div className='my-auto'>
                                <div className='mb-5'>Do you love birds?</div>
                                <div className='mb-5'>Be an environmental conservationist and do your bit in helping
                                    preserve this beautiful species!
                                </div>
                                <div className='mb-5'>
                                    Come help us by taking observations about birds that you see in you area.
                                </div>

                                <div>
                                    BioTrack is an application that assists in gathering data by tracking animal
                                    sightings in documented locations. For this project, birds will be the first species
                                    that the web application will be developed for. The application employs a
                                    user-friendly format to receive and compile data on bird species. Using this
                                    application allows the user to be a part of solving the problem of the endangered
                                    biodiversity across the world.
                                </div>

                                <div className="mt-4 text-center">
                                    <Link className='btn btn-lg btn-outline-dark' href='/add-observation'>Add
                                        Observation</Link>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className='pb-5'>
                                <div className='auth-prompt'>
                                    <Login></Login>
                                </div>
                                <img className={styles.logo_large} src='/images/logo-lg.png'/>
                                {/*<Image src={'/images/logo-lg.png'} alt='BioTrack Logo' width={200}></Image>*/}
                                <div className='auth-prompt'>
                                    <h2 className='highlight'>Join BioTrack Today!</h2>
                                    <div className="d-grid gap-2">
                                        <Button href='/signup' variant="primary" size="lg">Sign Up</Button>
                                        <Button variant="primary" size="lg" className={'d-md-none'}>Login</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="mt-4">
                <h3 className={'text-center'}>Current Observations</h3>
                <div style={{display: "table", margin: '0 auto'}}>

                    {/* Use a Google Maps component to render a Google Map with pins */}
                    <APIProvider apiKey={API_KEY}>
                        {/*
                                Documentation: https://visgl.github.io/react-google-maps/docs/api-reference/components/api-provider
                                */}
                        <Map
                            style={{width: '100vw', height: '400px'}}
                            defaultCenter={{lat: 22.54992, lng: 0}}
                            defaultZoom={2}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                        >
                            {/*
                                Documentation: https://visgl.github.io/react-google-maps/docs/api-reference/components/marker

                                Display the list of locations that we recieve from the database as pins/markers on the map
                                */}
                            {observationLocations.map(observationLocation => <Marker
                                position={observationLocation}/>)}
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </div>
    );
}
