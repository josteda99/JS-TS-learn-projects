import { Button } from "@mui/material";
import { Link } from "react-router";

export function Home() {
  return (
    <>
      <h1>Who wants to be a Millionarie</h1>
      <Link to="/game">
        <Button variant="contained" size="large">
          Play
        </Button>
      </Link>
    </>
  );
}
