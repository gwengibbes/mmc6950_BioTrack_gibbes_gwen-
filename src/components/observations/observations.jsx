import Observation from "@/components/observations/observation";
import {Col, Row} from "react-bootstrap";

export default function Observations({observations}) {
    return (
        <div>
            <Row>
                <Col md={8} className={'offset-md-2'}>
                    {observations.map(o => {
                            return <Row key={o._id}>
                                <Col xs='12' ><Observation observation={o}/></Col>
                                {/*<hr className={'mt-5 mb-5'} />*/}
                            </Row>


                        }
                    )}
                </Col>
            </Row>
        </div>
    )
}