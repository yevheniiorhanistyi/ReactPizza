import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/slices/pizzaSlice';

import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import ErrorMessage from '../ErrorMessage';

import styles from './PaginatedItems.module.scss';

type PaginatedItemsProps = {
    pizzas: any;
}

const PaginatedItems: React.FC<PaginatedItemsProps> = ({ pizzas }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const { loading, error } = useSelector(selectItems);

    const endOffset = itemOffset + 4;
    const currentItems = pizzas.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(pizzas.length / 4);


    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * 4) % pizzas.length;
        setItemOffset(newOffset);
    };

    const renderItems = (content: any) => {
        return (
            <div className="content__items">
                {content}
            </div>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const skeletons = loading ? renderItems([...new Array(4)].map((_, index) => <Skeleton key={index} />)) : null;
    const content = !(loading || error) ? renderItems(currentItems.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)) : null;

    return (
        <>
            {errorMessage || skeletons || content}

            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                previousLabel="<"
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
            />
        </>

    )
}


export default PaginatedItems;