import React from "react";
import { SearchContext } from '../components/App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import axios from "axios";

import Preloader from '../components/Preloader/';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from "../components/Search";
import PaginatedItems from "../components/PaginatedItems";

const Home = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(true);
    const { categoryId, sort } = useSelector((state) => state.filter);
    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const load = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1200);
    }

    React.useEffect(() => {

        load();
        setIsLoading(true);
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        axios.get(`https://639b4f9ed5141501975219ce.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`)
            .then((response) => {
                setItems(response.data);
                setIsLoading(false);
            })

        window.scrollTo(0, 0);

        return () => {
            clearTimeout(load);
        }

    }, [categoryId, sort.sortProperty, searchValue]);

    const pizzas = items.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    });

    return (
        <>
            {loading && <Preloader />}
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                    <Sort />
                </div>
                <Search />
                <PaginatedItems pizzas={pizzas} isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>
        </>

    )
}

export default Home;