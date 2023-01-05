import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/slices/pizzaSlice';
import { selectFilter } from '../../redux/slices/filterSlice';

import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import ErrorMessage from '../ErrorMessage';

import styles from './PaginatedItems.module.scss';

const PaginatedItems: React.FC = () => {
    const [itemOffset, setItemOffset] = useState(0);
    const { items } = useSelector(selectItems);
    const { searchValue } = useSelector(selectFilter);
    const { loading, error } = useSelector(selectItems);

    const pizzas = items.filter((obj) => {

        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    });

    const endOffset = itemOffset + 4;
    const currentItems = pizzas.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(pizzas.length / 4);


    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * 4) % pizzas.length;
        setItemOffset(newOffset);
    };

    const renderItems: React.FC = (content: any) => {

        return (
            <div className="content__items">
                {content}
            </div>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const skeletons = loading ? renderItems([...new Array(4)].map((_, index) => <Skeleton key={index} />)) : null;
    const content = !(loading || error) ? renderItems(currentItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />)) : null;

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