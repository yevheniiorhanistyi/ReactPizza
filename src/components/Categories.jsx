import React from "react";

const Categories = () => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    const [activeIndex, setActiveIndex] = React.useState(0);

    const onClickCategory = (id) => {
        setActiveIndex(id);
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((item, id) => {
                    return (
                        <li
                            className={activeIndex === id ? "active" : ''}
                            onClick={() => onClickCategory(id)}
                            key={id}>{item}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Categories;