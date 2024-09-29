import Link from "next/link";

export default function ObservationCreated() {
    return <div>
        <div id="thank-you" className="text-center mt-5 mb-5">
            <h3>Thank you for submitting a sighting</h3>
            <div>
                <Link className='btn-primary' href='/add-observation'>Submit Another</Link>
                {/*<button onClick="submitAnother()" className="btn btn-primary">Submit Another</button>*/}
            </div>
        </div>
    </div>
}