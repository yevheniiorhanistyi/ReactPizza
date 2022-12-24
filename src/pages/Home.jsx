import React from "react";
import { SearchContext } from '../components/App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from "../components/Search";
import PaginatedItems from "../components/PaginatedItems";

const Home = () => {
    const dispatch = useDispatch();
    const { categoryId, sort } = useSelector((state) => state.filter);

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }


    React.useEffect(() => {
        setIsLoading(true);
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
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

    }, [categoryId, sort.sortProperty, searchValue])

    const pizzas = items.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    });

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <Search />
            <PaginatedItems pizzas={pizzas} isLoading={isLoading} />
        </div>
    )
}

export default Home;