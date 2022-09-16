import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  Routes,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { fetchMoviesMore } from '../../../services/themoviedb-api';
import { toast } from 'react-toastify';
import { ThreeCircles } from 'react-loader-spinner';

import notFound from '../../../img/not-found.jpg';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function MovieDetailsPage(onGoBack) {
  const { movieId } = useParams();
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (info === null) {
      fetchMoviesMore(movieId, '')
        .then(data => {
          setInfo(data);
        })
        .catch(error => toast.error(error));
    }
  });

  const goBack = () => {
    navigate(location?.state?.from ?? '/');
  };

  return (
    info && (
      <div className={s.wrapper}>
        <div className={s.infoWrapper}>
          <button className={s.back} onClick={goBack}>
            Back
          </button>
          <h1>{info.title}</h1>
          <p>Release date: {info.release_date}</p>
          <div className={s.imgWrapper}>
            <img
              src={
                info.poster_path
                  ? `https://image.tmdb.org/t/p/w500${info.poster_path}`
                  : notFound
              }
              alt={info.title}
            />
            <div style={{ padding: '0 20px' }}>
              <span>Rating: {info.vote_average}</span>
              <h2 style={{ marginTop: '10px' }}>Overview</h2>
              <p>{info.overview}</p>
              <h2>Genres</h2>
              <ul>
                {info.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={s.navWrapper}>
          <NavLink to={`cast`} state={{ from: location?.state?.from ?? null }}>
            Cast
          </NavLink>
          <NavLink
            to={`reviews`}
            state={{ from: location?.state?.from ?? null }}
          >
            Reviews
          </NavLink>
        </div>

        <div className={s.subInfoWrapper}>
          <Suspense
            fallback={
              <ThreeCircles
                color="rgb(243, 161, 67)"
                visible={true}
                ariaLabel="three-circles-rotating"
                wrapperStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            }
          >
            <Routes>
              <Route path={`cast`} element={<Cast />} />
              <Route path={`reviews`} element={<Reviews />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    )
  );
}
