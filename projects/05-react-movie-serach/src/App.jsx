import { Movies } from "./components/movies";
import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { useEffect, useRef, useState } from "react";

function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = search === "";
      return;
    }

    if (search === "") {
      setError("no se puede buscar una pelicula vacia");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("no se puede buscar una pelicula con solo numeros");
      return;
    }

    if (search.length < 3) {
      setError("la busqueda debe tener al menos 3 caracteres");
      return;
    }
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    getMovies({ search: event.target.value });
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input name="search" onChange={handleChange} value={search} placeholer="Avengers, starwars, matrix" />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
