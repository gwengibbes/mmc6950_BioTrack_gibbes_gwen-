import {Button, Col, Row} from "react-bootstrap";
import Moment from "react-moment";
import {APIProvider, Map, Marker} from "@vis.gl/react-google-maps";

export default function Observation({ observation: o }) {
    const API_KEY = 'AIzaSyBINQ12s2muvZrBKDnvVwKpammt1TdFtc0';

    async function deleteObservation() {
        if(confirm('Are you sure you want to delete this observation?')){
            const response = await fetch(`/api/observations/${o._id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            location.reload();
        }
    }

  return (
    <div>
      {o.photos.length > 0 && <img src={o.photos[0].content} />}

      <h3>{o.birdType}</h3>
      <div>
        <b>Seen At:</b>{" "}
        {o.timeSeen ? <Moment format="LLL" date={o.timeSeen} /> : "-"}
      </div>
      <div>
        <b>Reported At:</b> <Moment format="LLL" date={o.createdAt} />
      </div>

      <div style={{ marginTop: "15px" }}>
        <h5>Weather Conditions at Observation Time</h5>
        <Row>
          <Col>
            Weather Condition: {o.weatherCondition ? o.weatherCondition : "-"}
          </Col>
        </Row>
        <Row>
          <Col>Temperature: {o.temperature ? `${o.temperature} ºF` : "-"}</Col>
        </Row>
        <Row>
          <Col>Wind Intensity: {o.windIntensity ? o.windIntensity : "-"}</Col>
        </Row>
        <Row>
          <Col>Cloud Cover: {o.cloudCover ? o.cloudCover : "-"}</Col>
        </Row>
      </div>
        <div>
            {o.coordinates &&
                <APIProvider apiKey={API_KEY}>
                    {/*
                                Documentation: https://visgl.github.io/react-google-maps/docs/api-reference/components/api-provider
                                */}
                    <Map
                        style={{width: '100%', height: '200px'}}
                        defaultCenter={o.coordinates}
                        defaultZoom={12}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    >
                        {/*
                                Documentation: https://visgl.github.io/react-google-maps/docs/api-reference/components/marker

                                Display the list of locations that we recieve from the database as pins/markers on the map
                                */}
                        <Marker position={o.coordinates}/>
                    </Map>
                </APIProvider>
            }
        </div>

        {
            o.isOwner && <div className='text-center mt-3 mb-5'><Button onClick={deleteObservation} className='btn btn-primary'>Delete</Button></div>
        }
    </div>
  );
}
