import Observation from "@/components/observations/observation";
import {Col, Row} from "react-bootstrap";

export default function Observations({observations}) {
    return (
        <div>
            <Row>
                {observations.map(o => <Col md='4' key={o._id}><Observation observation={o}/></Col>)}
            </Row>
            <ul>

            </ul>
        </div>
    )
}