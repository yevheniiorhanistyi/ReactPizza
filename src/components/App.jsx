import React from 'react';

import Header from './Header';
import Categories from './Categories';
import Sort from './Sort';
import PizzaBlock from './PizzaBlock';
// import Spinner from './Spinner';

import '../scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://639b4f9ed5141501975219ce.mockapi.io/pizzas")
      .then((res) => {
        return res.json()
      })
      .then(json => {
        setItems(json)
      })
  }, [])




  return (

    <div className="wrapper">
      {/* <Spinner /> */}
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
