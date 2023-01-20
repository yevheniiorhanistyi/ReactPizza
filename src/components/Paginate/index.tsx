import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems } from '../../redux/pizza/selectors';
import { selectFilter } from '../../redux/filter/selectors';
import { setPageCount } from '../../redux/filter/slice';

import { PizzaItem } from '../../redux/pizza/types';

import { PaginateButtons } from './PaginateButtons';
import { PizzaBlock } from '../';
import Skeleton from '../PizzaBlock/Skeleton';

type PaginateProps = {
    pizzas: PizzaItem[];
    onChangePage: (props: number) => void;
};

export const Paginate: React.FC<PaginateProps> = ({ pizzas, onChangePage }) => {
    const dispatch = useDispatch();
    const { itemsOffset } = useSelector(selectFilter);
    const { error, loading } = useSelector(selectItems);

    const endOffset = itemsOffset + 4;
    const currentItems = pizzas.slice(itemsOffset, endOffset);

    const skeletons = loading ? [...new Array(4)].map((_, index) => <Skeleton key={index} />) : null;
    const content = !(loading || error) ? currentItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />) : null;

    useEffect(() => {
        const length = Math.ceil(pizzas.length / 4);

        if (length) {
            dispatch(setPageCount(length));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pizzas.length])

    return (
        <>
            <div className="content__items">
                {skeletons || content}
            </div>
            <PaginateButtons onChangePage={onChangePage} />
        </>
    )
}