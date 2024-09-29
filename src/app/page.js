import Image from "next/image";
import Link from "next/link";
import {Button} from "react-bootstrap";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>BioTrack</h1>

        <div>
          BioTrack is an application that assists in gathering data by tracking animal sightings in documented
          locations. For this project, birds will be the first species that the web application will be developed for.
          The application employs a user-friendly format to receive and compile data on bird species. Using this
          application allows the user to be a part of solving the problem of the endangered biodiversity across the
          world.
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link className='btn btn-lg btn-outline-dark' href='/add-observation'>Add Observation</Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
