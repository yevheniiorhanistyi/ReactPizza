import React from "react";
import { SearchContext } from '../components/App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from "react-router";

import axios from "axios";
import qs from 'qs';

import { list } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from "../components/Search";
import PaginatedItems from "../components/PaginatedItems";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);

    const { categoryId, sort } = useSelector((state) => state.filter);
    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const fetchPizzas = () => {
        setIsLoading(true);
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        axios.get(`https://639b4f9ed5141501975219ce.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`)
            .then((response) => {
                setItems(response.data);
                setIsLoading(false);
            })
    }

    React.useEffect(() => {
        if (window.location.search) {

            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                }))
            isSearch.current = true;
        }

    }, [])

    React.useEffect(() => {

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
        window.scrollTo(0, 0);

    }, [categoryId, sort.sortProperty, searchValue]);

    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId
        })

        navigate(`?${queryString}`);

    }, [categoryId, sort.sortProperty]);

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