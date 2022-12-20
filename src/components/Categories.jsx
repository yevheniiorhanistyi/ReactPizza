import React from "react";

const Categories = ({ value, onChangeCategory }) => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];



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
}

export default Categories;