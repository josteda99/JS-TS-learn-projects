import "./App.css";
import { lazy, Suspense } from "react";
import { Router } from "./Router";
import { Route } from "./Route";
import Page404 from "./pages/404";
import SearchPage from "./pages/Search";

const LazyAboutPage = lazy(() => import("./pages/About.jsx"));
const LazyHomePage = lazy(() => import("./pages/Home.jsx"));

const appRoutes = [{ path: "/search/:query", Component: SearchPage }];

function App() {
  return (
    <main>
      <Suspense fallBack={<div>Loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path="/" Component={LazyHomePage}></Route>
          <Route path="/about" Component={LazyAboutPage}></Route>
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
