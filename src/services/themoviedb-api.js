const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_KEY = 'd972d551b872ea18990fcd328a32dd6c';

async function fetchMovieAPI(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchAllFilms() {
  return fetchMovieAPI(`${BASE_URL}/trending/movie/week?api_key=${ACCESS_KEY}`);
}

export function fetchSearchMovies(query) {
  return fetchMovieAPI(
    `${BASE_URL}/search/movie?query=${query}&api_key=${ACCESS_KEY}&page=1`
  );
}

export function fetchMoviesMore(movieId, option) {
  return fetchMovieAPI(
    `${BASE_URL}/movie/${movieId}${option}?api_key=${ACCESS_KEY}`
  );
}
