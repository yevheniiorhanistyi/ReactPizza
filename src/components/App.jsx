import React from 'react';

import Header from './Header';
import Categories from './Categories';
import Sort from './Sort';
import PizzaBlock from './PizzaBlock';
import Skeleton from './PizzaBlock/Skeleton';

import '../scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://639b4f9ed5141501975219ce.mockapi.io/pizzas")
      .then((res) => {
        return res.json()
      })
      .then(json => {
        setItems(json);
        setIsLoading(false);
      })
  }, [])


  return (

    <div className="wrapper">
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
              isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            }
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
