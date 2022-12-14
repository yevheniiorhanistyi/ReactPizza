
type CategoriesProps = {
    value: number;
    onChangeCategory: (id: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
    const categories = ['Wszystkie ', 'Mięsna', 'Wegetariańska', 'Smażona', 'Neapolitańska', 'Sycylijska'];

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