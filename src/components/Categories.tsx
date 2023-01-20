import React from 'react';

type CategoriesProps = {
    value: number;
    onChangeCategory: (id: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
    const categories = ['Wszystkie ', 'Mięsna', 'Smażona', 'Wegetariańska', 'Neapolitańska', 'Sycylijska'];

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, id) => {
                    return (
                        <li
                            className={value === id ? "active" : ''}
                            onClick={() => onChangeCategory(id)}
                            key={id}>{categoryName}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
});