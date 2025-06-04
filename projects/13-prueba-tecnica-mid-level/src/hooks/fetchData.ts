import type { MovieI } from "../interfaces/movie";

export function fetchData(programType: string) {
  return fetch("http://localhost:5173/src/assets/data/sample.json")
    .then((res) => res.json())
    .then(({ entries }) => {
      const realeaseYear2010: MovieI[] = entries.filter((movie: MovieI) => movie.releaseYear >= 2010).filter((movie: MovieI) => movie.programType === programType);
      realeaseYear2010.sort((a, b) => a.title.localeCompare(b.title));
      return realeaseYear2010;
    });
}
