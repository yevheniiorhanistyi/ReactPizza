import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/pizza/selectors';
import { selectFilter } from '../../redux/filter/selectors';

import { PizzaItem } from '../../redux/pizza/types';

import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';

import styles from './Paginate.module.scss';

type PaginateProps = {
    pizzas: PizzaItem[];
    onChangePage: (props: number) => void;
};

const Paginate: React.FC<PaginateProps> = ({ pizzas, onChangePage }) => {
    const { currentPage, itemsOffset } = useSelector(selectFilter);
    const { error, loading } = useSelector(selectItems);

    const endOffset = itemsOffset + 4;
    const currentItems = pizzas.slice(itemsOffset, endOffset);

    const pageCount = Math.ceil(pizzas.length / 4);

    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
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
                        onClick={() => onChangePage(currentPage - 1)}
                        disabled={itemsOffset === 0}
                        className={styles.button}
                        type='button'>&lt;
                    </button>
                </li>
                {
                    pages.map((item, index) => (
                        <li className={currentPage === index ? styles.selected : ''}
                            key={item}>
                            <button
                                onClick={() => onChangePage(index)}
                                className={styles.button}
                                type='button'>{item}
                            </button>
                        </li>))
                }
                <li className={styles.next} >
                    <button
                        onClick={() => onChangePage(currentPage + 1)}
                        disabled={currentPage === pageCount - 1}
                        className={styles.button}
                        type='button'>&gt;
                    </button>
                </li>
            </ul>
        </>
    )
}

export default Paginate;