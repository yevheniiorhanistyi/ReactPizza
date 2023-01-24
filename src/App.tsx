import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';

import { Spinner } from './components';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));

const App: React.FC = () => {

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
