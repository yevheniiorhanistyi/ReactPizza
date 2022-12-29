import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { setLoading } from "../redux/slices/preloadSlice";

import axios from "axios";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from "../components/Search";
import PaginatedItems from "../components/PaginatedItems";

const Home = () => {
    const dispatch = useDispatch();

    const { categoryId, sort, searchValue } = useSelector((state) => state.filter);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const loading = () => {
        setTimeout(() => {
            dispatch(setLoading(false))
        }, 500);
    }

    React.useEffect(() => {

        loading();
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
            clearTimeout(loading);
        }
        // eslint-disable-next-line
    }, [categoryId, sort.sortProperty, searchValue]);

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
            <PaginatedItems pizzas={pizzas} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
    )
}

export default Home;