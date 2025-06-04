import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Link } from "react-router";

function App() {
  return (
    <>
      <main>
        <div style={{ display: "flex" }}>
          <Link to="/movies">
            <div style={{ margin: 10, display: "flex", alignItems: "end", justifyContent: "center" }} className="movie">
              <h4>Popular Movies</h4>
            </div>
          </Link>

          <Link to="/series">
            <div style={{ margin: 10, display: "flex", alignItems: "end", justifyContent: "center" }} className="movie">
              <h4>Popular Series</h4>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}

export default App;
