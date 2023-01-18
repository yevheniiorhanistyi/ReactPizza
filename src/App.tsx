import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';

import MainLayout from './layouts/mainLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';

const Cart = React.lazy(() => import('./pages/Cart'));

const App: React.FC = () => {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />} >
        <Route path='' element={<Home />} />
        <Route path='/cart' element={
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        } />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
