import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMoviesMore } from '../../../services/themoviedb-api';
import notFound from '../../../img/not-found.jpg';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  const location = useLocation();
  let topOffset = 0;
  useEffect(() => {
    if (cast === null) {
      fetchMoviesMore(movieId, '/credits')
        .then(data => {
          if (data.cast.length === 0)
            toast.error('There is no list of actors for this film.');
          setCast(data.cast);
          topOffset =
            document.querySelector('.MovieDetailsPage_infoWrapper__JyKSk')
              .offsetHeight + 20;
        })
        .catch(error => toast.error(error));
    }

    return () => {
      setTimeout(() => {
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth',
        });
      }, 200);
    };
  });

  return (
    <div>
      <ul className={s.list}>
        {cast &&
          cast.map(item => (
            <li key={item.id} className={s.listItem}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                    : notFound
                }
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
