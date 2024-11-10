import Link from "next/link";
import styles from "./auth-status.css";

console.log("Style:", styles);

export default function AuthStatus(props) {
  return (
    <div className={styles.authStatus}>
      {props.isLoggedIn && (
        <div>
          <span>Hello {props.username}!</span> | &nbsp;
          <Link href="/">Home</Link> | &nbsp;
          <Link href="/observations">Your Observations</Link> | &nbsp;
          {props.isAdmin && (
            <span>
              <Link href="/observations/review">Review All Observations</Link> |
              &nbsp;
            </span>
          )}
          <Link href="/api/logout">Log Out</Link>
        </div>
      )}
      {!props.isLoggedIn && <Link href="/">Home</Link>}
    </div>
  );
}
