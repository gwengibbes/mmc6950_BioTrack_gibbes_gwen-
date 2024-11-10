import localFont from "next/font/local";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import mongoose from "mongoose";
import AuthStatus from "@/components/AuthStatus/";
import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import {sessionOptions} from "@/config/ironSession";
// import 'bootstrap/dist/css/bootstrap.min.css';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BioTrack",
  description: "Gathering data by tracking animal sightings",
};

export default async function RootLayout({ children }) {
    const u = await getIronSession(cookies(), sessionOptions)
  return (
    <html lang="en">
    <head>
        {/*<link*/}
        {/*    rel="stylesheet"*/}
        {/*    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"*/}
        {/*    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"*/}
        {/*    crossOrigin="anonymous"*/}
        {/*/>*/}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="crossOriginnts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      <link href="crossOriginnts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Tangerine:wght@400;700&display=swap" rel="stylesheet"/>
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${!!u.username ? 'logged-in' :''}`}
      >
      <AuthStatus username={u.username} isAdmin={u.isAdmin}  isLoggedIn={!!u.username}/>
        {children}
      </body>
    </html>
  );
}
