import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { setLoading } from "../redux/slices/preloadSlice";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from "../components/Search";
import PaginatedItems from "../components/PaginatedItems";

const Home = () => {
    const dispatch = useDispatch();
    const { categoryId, sort, searchValue } = useSelector(selectFilter);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(fetchPizzas({
            sortBy,
            order,
            category,
            search
        }));

        window.scrollTo(0, 0);
    }

    React.useEffect(() => {
        getPizzas();

        const onComponentLoaded = () => {
            setTimeout(() => {
                dispatch(setLoading(false))
            }, 500);
        }

        onComponentLoaded();

        return () => {
            clearTimeout(onComponentLoaded);
        }
        // eslint-disable-next-line
    }, [categoryId, sort, searchValue]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <Search />
            <PaginatedItems />
        </div>
    )
}

export default Home;