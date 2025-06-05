import { Link } from "react-router";

export function NotFound() {
  return (
    <>
      <h1>Not found</h1>
      <Link to="/">Return to home</Link>
    </>
  );
}
