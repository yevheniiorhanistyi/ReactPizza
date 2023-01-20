import { useEffect, useCallback } from "react";
import { useSelector } from 'react-redux';

import { setCategoryId, setCurrentPage, setItemsOffset } from '../redux/filter/slice';
import { selectFilter } from "../redux/filter/selectors";
import { useAppDispatch } from "../redux/store";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { selectItems } from '../redux/pizza/selectors'

import { ErrorMessage, Categories, SortPopup, Search, Paginate } from '../components';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categoryId, sort, searchValue, currentPage } = useSelector(selectFilter);
    const { error, items } = useSelector(selectItems);


    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
        // eslint-disable-next-line
    }, []);

    const onChangePage = (page: number) => {

        if (page) {
            const newOffset = (page * 4) % pizzas.length;
            dispatch(setCurrentPage(page));
            dispatch(setItemsOffset(newOffset));
        } else {
            dispatch(setCurrentPage(0));
            dispatch(setItemsOffset(0));
        }
    };

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
        // eslint-disable-next-line
    }, [categoryId, sort, searchValue, currentPage]);

    useEffect(() => {
        onChangePage(0);
        // eslint-disable-next-line
    }, [categoryId, searchValue])

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
                        <SortPopup value={sort} />
                    </div>
                    <Search />
                    <Paginate pizzas={pizzas} onChangePage={onChangePage} />
                </div>
            }
        </>
    )
}

export default Home;