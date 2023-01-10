import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/slices/pizzaSlice';
import { selectFilter, setCurrentPage } from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../redux/store';

import { PizzaItem } from '../../redux/slices/pizzaSlice';

import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';

import styles from './Paginate.module.scss';

type PaginateProps = {
    pizzas: PizzaItem[];
};

const Paginate: React.FC<PaginateProps> = ({ pizzas }) => {
    const dispatch = useAppDispatch();
    const [itemOffset, setItemOffset] = useState(0);
    const { searchValue, currentPage } = useSelector(selectFilter);
    const { error, loading, items } = useSelector(selectItems);
    console.log('itemOffset: ' + itemOffset)
    const endOffset = itemOffset + 4;
    const currentItems = pizzas.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(pizzas.length / 4);

    const handlePageClick = (page: number) => {

        const newOffset = Math.ceil((page * pageCount) / pizzas.length);

        console.log('pizzas.length: ' + pizzas.length)
        console.log('newOffset: ' + newOffset)
        dispatch(setCurrentPage(page));
        setItemOffset(newOffset);
    };

    const skeletons = loading ? [...new Array(4)].map((_, index) => <Skeleton key={index} />) : null;
    const content = !(loading || error) ? currentItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />) : null;

    return (
        <>
            <div className="content__items">
                {skeletons || content}
            </div>

            <ul className={styles.root}>
                <li className={styles.previous} >
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        className={styles.button}
                        type='button'>&lt;
                    </button>
                </li>
                <li className={styles.selected}>
                    <button className={styles.button} type='button'>{currentPage}</button>
                </li>
                <li className={styles.next} >
                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        className={styles.button}
                        type='button'>&gt;
                    </button>
                </li>
            </ul>
        </>
    )
}

export default Paginate;