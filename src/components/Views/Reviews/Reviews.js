import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMoviesMore } from '../../../services/themoviedb-api';
import s from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  let topOffset = 0;

  useEffect(() => {
    if (reviews === null) {
      fetchMoviesMore(movieId, '/reviews')
        .then(data => {
          if (data.results.length === 0)
            toast.error('There are no reviews for this movie.');

          setReviews(data.results);
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
        {reviews &&
          reviews.map(item => {
            const date = new Date(item.created_at);
            const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
            return (
              <li key={item.id}>
                <div>
                  <p className={s.author}>{item.author}</p>
                  <p className={s.create}>{dateString}</p>
                </div>
                <p>{item.content}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

{
}
