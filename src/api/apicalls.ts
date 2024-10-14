// //const apikey: string = '753049c9feaee5416b7f1b3fe918f733';
// const apikey: string = '5e917011565515815c286b6ef6e387ef'
// export const baseImagePath = (size: string, path: string) => {
//   return `https://image.tmdb.org/t/p/${size}${path}`;
// };
// export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
// // export const nowPlayingMovies: string = `http://localhost:5000/api/customer/movies`;

// export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
// export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;

// export const searchMovies = (keyword: string) => {
//   return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
// };
// export const movieDetails = (id: number) => {
//   return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
// };
// export const movieCastDetails = (id: number) => {
//   return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
// };
// movieApi.ts (or any file where fetchPopularMovies is defined)

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  posterUrl: string;
}

const API_KEY = '5e917011565515815c286b6ef6e387ef';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export async function fetchPopularMovies(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    posterUrl: `${IMAGE_BASE_URL}${movie.poster_path}`,
  }));
}
