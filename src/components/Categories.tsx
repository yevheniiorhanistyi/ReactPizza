import React from 'react';

type CategoriesProps = {
    value: number;
    onChangeCategory: (id: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
    const categories = ['All ', 'Meat', 'Fried', 'Vegetarian', 'Neapolitan', 'Sicilian'];

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