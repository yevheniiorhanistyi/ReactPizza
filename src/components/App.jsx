import React from 'react';
import { Routes, Route } from 'react-router';
import { useSelector } from 'react-redux';

import Preloader from './Preloader';
import Header from './Header';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';

import '../scss/app.scss';

function App() {

  const { loading } = useSelector((state) => state.preload);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {loading && <Preloader />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
