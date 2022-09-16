import { useState, useEffect } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import { fetchSearchMovies } from '../../../services/themoviedb-api';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import notFound from '../../../img/not-found.jpg';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  const [value, setValue] = useState('');
  const [searchMovie, setSearchMovie] = useState(query ?? '');
  const [findedMovies, setFindedMovies] = useState(null);
  useEffect(() => {
    if (searchMovie !== '') {
      fetchSearchMovies(searchMovie)
        .then(res => {
          if (res.total_results === 0) {
            toast.error('Nothing was found. Try another movie title');
            return;
          }
          setFindedMovies(res.results);
        })
        .catch(error => toast.error(error));
      navigate(`?q=${searchMovie}`);
    }
  }, [searchMovie, navigate]);

  const InputHandler = e => {
    setValue(e.target.value.toLowerCase());
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.error('Enter what you want to find');
      return;
    }

    setSearchMovie(value);
    setValue('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={s.formWrapper}>
        <form className={s.form} onSubmit={onSubmitHandler}>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={value}
            onChange={InputHandler}
          />
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
            <ImSearch style={{ marginLeft: '10px' }} />
          </button>
        </form>
      </div>
      <div>
        <ul className={s.list}>
          {findedMovies &&
            findedMovies.map(movie => {
              return (
                <li key={movie.id} className={s.item}>
                  <Link to={`/movies/${movie.id}`} state={{ from: location }}>
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
    </div>
  );
}
