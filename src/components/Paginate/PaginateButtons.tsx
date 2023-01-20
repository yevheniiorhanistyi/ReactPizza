import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filter/selectors';

import styles from './Paginate.module.scss';

type PaginateButtonsProps = {
    onChangePage: (props: number) => void;
};

export const PaginateButtons: React.FC<PaginateButtonsProps> = ({ onChangePage }) => {
    const { currentPage, itemsOffset, pageCount } = useSelector(selectFilter);
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
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
    )
}

