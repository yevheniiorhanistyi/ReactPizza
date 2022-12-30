import ReactPaginate from 'react-paginate';
import React from 'react';
import { useSelector } from 'react-redux';

import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';

import styles from './PaginatedItems.module.scss';

const PaginatedItems = ({ pizzas }) => {
    const [itemOffset, setItemOffset] = React.useState(0);
    const { status } = useSelector((state) => state.pizza);

    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
    const endOffset = itemOffset + 4;
    const currentItems = pizzas.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(pizzas.length / 4);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * 4) % pizzas.length;

        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="content__items">
                {status === 'loading' ? skeletons : currentItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                previousLabel="<"
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
            />
        </>

    )
}


export default PaginatedItems;