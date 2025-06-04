import { create } from "zustand";
import type { MovieI } from "../interfaces/movie";

interface InitialStateI {
  movies: MovieI[];
  selectedMovie: MovieI | null;
  changeSelectedMovide: (movie: MovieI) => void;
  addMovies: (movies: MovieI[]) => void;
  changeLoading: (loading: boolean) => void;
  loading: boolean;
}

export const useMovieStore = create<InitialStateI>((set, get) => ({
  movies: [],
  selectedMovie: null,
  loading: false,
  changeSelectedMovide: (movie) => set({ selectedMovie: movie }),
  addMovies: (movies) => set({ movies: movies, loading: false }),
  changeLoading: (loading) => set({ loading }),
}));
