import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { setLoading } from "../redux/slices/preloadSlice";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from "../components/Search";
import PaginatedItems from "../components/PaginatedItems";

const Home = () => {
    const dispatch = useDispatch();

    const { items } = useSelector((state) => state.pizza);
    const { categoryId, sort, searchValue } = useSelector((state) => state.filter);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const loading = () => {
        setTimeout(() => {
            dispatch(setLoading(false))
        }, 500);
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
        loading();
        getPizzas();

        return () => {
            clearTimeout(loading);
        }
        // eslint-disable-next-line
    }, []);

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
            <PaginatedItems pizzas={pizzas} />
        </div>
    )
}

export default Home;