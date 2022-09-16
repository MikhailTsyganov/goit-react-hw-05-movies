import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllFilms } from '../../../services/themoviedb-api';
import notFound from '../../../img/not-found.jpg';
import s from './HomePage.module.css';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (movies !== null) {
      return;
    }

    fetchAllFilms()
      .then(res => {
        if (res.total_results === 0) {
          toast.error('Oops... Something went wrong, please try again later');
          return;
        }
        setMovies(res.results);
      })
      .catch(error => toast.error(error));
  });

  return (
    <div className={s.wrapper}>
      <h1 style={{ textAlign: 'center' }}>Trends this week</h1>
      <ul className={s.list}>
        {movies &&
          movies.map(movie => {
            return (
              <li key={movie.id} className={s.item}>
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : notFound
                    }
                    alt={movie.name ?? movie.title}
                  />
                  <h2>{movie.name ?? movie.title}</h2>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
