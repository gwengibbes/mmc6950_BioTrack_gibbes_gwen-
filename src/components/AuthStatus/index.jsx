import Link from "next/link";
import styles from "./auth-status.module.css";

export default function AuthStatus(props) {
  return (
    <div className={styles.authStatus}>
      {props.isLoggedIn && (
        <div>
          <span>Hello {props.username}!</span> | &nbsp;
          <Link href="/">Home</Link> | &nbsp;
          <Link href="/bird-match">Bird Match</Link> | &nbsp;
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
      {!props.isLoggedIn && <div>
        <Link href="/">Home</Link> | &nbsp;
        <Link href="/bird-match">Bird Match</Link>
      </div>
      }
    </div>
  );
}
