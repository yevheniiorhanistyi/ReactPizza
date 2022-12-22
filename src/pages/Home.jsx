import React from "react";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from "../components/search";
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = ({ searchValue, setSearchValue }) => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
        name: 'Popularność',
        sortProperty: 'rating'
    });


    React.useEffect(() => {
        setIsLoading(true);
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://639b4f9ed5141501975219ce.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => {
                return res.json()
            })
            .then(json => {
                setItems(json);
                setIsLoading(false);
            })
        window.scrollTo(0, 0);
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
                <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
            </div>
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="content__items">

                {
                    isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </div>
    )
}

export default Home;