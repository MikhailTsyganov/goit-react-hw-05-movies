import { lazy, Suspense } from 'react';
import Navigation from './Navigation/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

const HomePage = lazy(() => import('./Views/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./Views/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./Views/MovieDetailsPage/MovieDetailsPage')
);

export const App = () => {
  return (
    <>
      <Navigation />
      <div style={{ paddingTop: '70px' }}>
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
                height: '90vh',
              }}
            />
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          </Routes>
        </Suspense>
      </div>

      <ToastContainer autoClose={2500} />
    </>
  );
};
