import React from 'react';
import { Routes, Route } from 'react-router';

import Header from './Header';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';

import '../scss/app.scss';

function App() {
  const [searchValue, setSearchValue] = React.useState('');


  return (

    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home searchValue={searchValue} setSearchValue={setSearchValue} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
