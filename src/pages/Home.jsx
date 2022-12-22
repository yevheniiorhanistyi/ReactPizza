import React from "react";
import { SearchContext } from '../components/App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from "../components/Search";
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../components/Pagination";

const Home = () => {
    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortType, setSortType] = React.useState({
        name: 'Popularność',
        sortProperty: 'rating'
    });


    React.useEffect(() => {
        setIsLoading(true);
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://639b4f9ed5141501975219ce.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => {
                return res.json()
            })
            .then(json => {
                setItems(json);
                setIsLoading(false);
            })
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    }).map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
                <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
            </div>
            <Search />
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home;