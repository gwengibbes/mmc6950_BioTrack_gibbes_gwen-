'use client';
import { useState } from "react";
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import styles from './add-observation.module.css';

export default function AddObservation() {
    const [observation, setObservation] = useState({
        birdType: '',
        timeSeen: '',
        noOfBirds: '',
        flyThroughs: '',
        flyOvers: '',
        weatherCondition: '',
        windIntensity: '',
        temperature: '',
        temperatureUnit: 'F',
        cloudCover: '',
        location: '',
        photos: []
    })
    const router = useRouter();

    function updateObservation(updates) {
        console.log('Updating observation with: ', updates)
        setObservation({
            ...observation,
            ...updates
        });
    }

    async function attachFiles(files) {
        console.log(files);
        const photos = [];
        for (let file of files) {
            const { name, type } = file;
            photos.push({
                content: await convertBase64(file),
                name,
                contentType: type,
            })
        }
        updateObservation({ photos });
    }

    function convertBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    function useCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            updateObservation({
                location: `${position.coords.latitude},${position.coords.longitude}`
            })
        });
    }

    function submitObservation() {
        return async (e) => {
            const url = "/api";
            try {
                const response = await fetch(`${url}/observations`, {
                    method: 'POST',
                    body: JSON.stringify(observation),
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                router.push('/add-observation/thank-you');
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <div className={styles.page}>
            <Container className='mx-auto'>
                <div className={styles.header}>
                    <img src='/images/logo-add-observation.png' />
                </div>
                <Row>
                    <Col sm='12'>
                        <h1 className="text-center">BioTrack</h1>
                        <div className="text-center">Share details about a sighting you observed</div>
                    </Col>
                </Row>
                <Row>
                    <Col md='2' className={styles.birds}>
                    </Col>
                    <Col sm='8'>
                        <Form id="birdSighting" className="form" method="post">
                            <div>
                                <FormGroup className={'form-group'} controlId='birdType'>
                                    <FormLabel>Type of Bird</FormLabel>
                                    <FormControl size={'lg'} onChange={(e) => {
                                        updateObservation({ birdType: e.target.value })
                                    }} value={observation.birdType} type='text'></FormControl>
                                </FormGroup>

                                <FormGroup className="mb-4">
                                    <label htmlFor="timeSeen">Date and Time Seen</label>
                                    <input value={observation.timeSeen} onChange={(e) => {
                                        updateObservation({ timeSeen: e.target.value })
                                    }} id="timeSeen" name="timeSeen" type="datetime-local" className="form-control" />
                                </FormGroup>

                                <div className="form-group mb-4">
                                    <label htmlFor="noOfBirds">Number of Birds Counted</label>
                                    <input value={observation.noOfBirds} onChange={(e) => {
                                        updateObservation({ noOfBirds: e.target.value })
                                    }} id="noOfBirds" name="noOfBirds" type="number" className="form-control" />
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="flyThroughs">Counted Flythroughs</label>
                                    <input value={observation.flyThroughs} onChange={(e) => {
                                        updateObservation({ flyThroughs: e.target.value })
                                    }} id="flyThroughs" name="flyThroughs" type="number" className="form-control" />
                                    <small>All birds that fly through a point, below the tallest structure in an area but do not land on any structure.</small>
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="flyOvers">Counted fly-overs</label>
                                    <input value={observation.flyOvers} onChange={(e) => {
                                        updateObservation({ flyOvers: e.target.value })
                                    }} id="flyOvers" name="flyOvers" type="number" className="form-control" />
                                    <small>All higher-flying birds that fly above than the tallest structure in an area.</small>
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="weather">Weather</label>
                                    <input value={observation.weatherCondition} onChange={(e) => {
                                        updateObservation({ weatherCondition: e.target.value })
                                    }} id="weather" name="weather" type="text" className="form-control" />
                                    <small>A brief description of the weather conditions</small>
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="wind">Wind Intensity</label>
                                    <select value={observation.windIntensity} onChange={(e) => {
                                        updateObservation({ windIntensity: e.target.value })
                                    }} name="wind" id="wind" className="form-control">
                                        <option value="">Select an Option</option>
                                        <option value="high">High</option>
                                        <option value="moderate">Moderate</option>
                                        <option value="low">Low</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="temp">Temperature</label>
                                    <div className="input-group mb-3">
                                        <input value={observation.temperature} onChange={(e) => {
                                            updateObservation({ temperature: e.target.value })
                                        }} id="temp" name="temp" type="text" className="form-control" />
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon2">
                                                <select value={observation.temperatureUnit} onChange={(e) => {
                                                    updateObservation({ temperatureUnit: e.target.value })
                                                }}>
                                                    <option value='f'>ºF</option>
                                                    <option value='c'>ºC</option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="clouds">Cloud Cover</label>
                                    <select value={observation.cloudCover} onChange={(e) => {
                                        updateObservation({ cloudCover: e.target.value })
                                    }} name="wind" id="wind" className="form-control">
                                        <option value="">Select an Option</option>
                                        <option value="Clear Sky">Clear Sky</option>
                                        <option value="few clouds">Few Clouds</option>
                                        <option value="Scattered Clouds">Scattered Clouds</option>
                                        <option value="Broken Clouds">Broken Clouds</option>
                                        <option value="Overcast">Overcast</option>
                                    </select>
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="location">Location Seen</label>
                                    <div className="input-group mb-3">
                                        <input value={observation.location} onChange={(e) => {
                                            updateObservation({ location: e.target.value })
                                        }} id="location" name="location" type="text" className="form-control" />
                                        <div className="input-group-append">
                                            <button onClick={(e) => {
                                                useCurrentLocation()
                                            }} className="btn btn-outline-dark"
                                                type="button">
                                                Use Current Location
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div><input type="file" multiple onChange={e => attachFiles(e.target.files)} /></div>
                                    <div><small>Attach any photos you have captured that are relevant to the
                                        sighting.</small></div>
                                </div>

                            </div>
                            <div className='text-center mt-5'>
                                <Button className='btn btn-primary btn-lg' onClick={submitObservation()} variant='primary'>Submit</Button>
                            </div>
                        </Form>
                    </Col>
                    <Col md='2'>
                        <img />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}