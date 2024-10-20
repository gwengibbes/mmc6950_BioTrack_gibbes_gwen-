import {Col, Row} from "react-bootstrap";
import Moment from "react-moment";

export default function Observation({observation: o}) {
    return (
        <div>
            {
                o.photos.length>0 &&
                <img src={o.photos[0].content}/>
            }

            <h3>{o.birdType}</h3>
            <div><b>Seen At:</b> {o.timeSeen ? <Moment format="LLL" date={o.timeSeen}/> : '-'}</div>
            <div><b>Reported At:</b> <Moment format="LLL" date={o.createdAt}/></div>

            <div style={ {marginTop: '15px'} }>
                <h5 >Weather Conditions at Observation Time</h5>
                <Row>
                    <Col>Weather Condition: { o.weatherCondition ? o.weatherCondition : '-'}</Col>
                </Row>
                <Row>
                    <Col>Temperature: { o.temperature ? `${o.temperature} ºC`  : '-'}</Col>
                </Row>
                <Row>
                    <Col>Wind Intensity: { o.windIntensity ? o.windIntensity : '-'}</Col>
                </Row>
                <Row>
                    <Col>Cloud Cover: { o.cloudCover ? o.cloudCover : '-'}</Col>
                </Row>

            </div>
        </div>
    )
}
