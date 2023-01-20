import React, { useEffect, useRef, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { setLoading } from './redux/preload/slice';

import { Spinner } from './components';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const refTimer = useRef<number | null>(null);

  const startTimer = () => {
    if (refTimer.current !== null) return;
    refTimer.current = window.setTimeout(() => {
      dispatch(setLoading(false))
    }, 800);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (refTimer.current !== null) {
        window.clearTimeout(refTimer.current);
        refTimer.current = null;
      }
    }
    // eslint-disable-next-line
  }, []);


  return (
    <Routes>
      <Route path='/' element={<MainLayout />} >
        <Route path='' element={<Home />} />
        <Route
          path='/cart'
          element={
            <Suspense fallback={<Spinner />}>
              <Cart />
            </Suspense>
          } />
        <Route
          path='*'
          element={
            <Suspense fallback={<Spinner />}>
              <NotFound />
            </Suspense>
          } />
      </Route>
    </Routes>
  );
}

export default App;
