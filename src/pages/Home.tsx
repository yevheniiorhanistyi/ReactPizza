import { useEffect, useRef, useCallback, useState } from "react";
import { useSelector } from 'react-redux';

import { setCategoryId, selectFilter, setCurrentPage } from '../redux/slices/filterSlice';
import { useAppDispatch } from "../redux/store";
import { fetchPizzas, selectItems } from "../redux/slices/pizzaSlice";
import { setLoading } from "../redux/slices/preloadSlice";

import ErrorMessage from "../components/ErrorMessage";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from "../components/Search";
import Paginate from "../components/Paginate";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categoryId, sort, searchValue, currentPage } = useSelector(selectFilter);
    const { error, items } = useSelector(selectItems);
    const [pageItemsOffset, setPageItemsOffset] = useState(0);
    const refTimer = useRef<number | null>(null);

    const startTimer = () => {
        if (refTimer.current !== null) return;
        refTimer.current = window.setTimeout(() => {
            dispatch(setLoading(false))
        }, 1000);
    };

    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));

        if (items.length <= 4) {
            console.log('changePage')
            onChangePage(0);
        }
        // eslint-disable-next-line
    }, []);

    const onChangePage = useCallback((page: number) => {
        const newOffset = (page * 4) % pizzas.length;
        dispatch(setCurrentPage(page));
        setPageItemsOffset(newOffset);
        // eslint-disable-next-line
    }, [categoryId, currentPage]);

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search
            }));

        window.scrollTo(0, 0);
    }

    useEffect(() => {
        getPizzas();
        startTimer();

        return () => {
            if (refTimer.current !== null) {
                window.clearTimeout(refTimer.current);
                refTimer.current = null;
            }
        }
        // eslint-disable-next-line
    }, [categoryId, sort, searchValue, currentPage]);

    const pizzas = items.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    });

    return (
        <>
            {error ?
                <ErrorMessage />
                :
                <div className="container">
                    <div className="content__top">
                        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                        <Sort />
                    </div>
                    <Search />
                    <Paginate pizzas={pizzas} pageItemsOffset={pageItemsOffset} onChangePage={onChangePage} />
                </div>
            }
        </>
    )
}

export default Home;