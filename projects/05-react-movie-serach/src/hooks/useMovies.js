import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async () => {
    if (search === previousSearch.current) return;
    if (search) {
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies };
}
