import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';

import MainLayout from './layouts/mainLayout';
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
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          } />
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          } />
      </Route>
    </Routes>
  );
}

export default App;
