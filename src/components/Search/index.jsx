import React from "react";
import { SearchContext } from '../App';

import styles from './Search.module.scss';

const Search = () => {
    const { searchValue, setSearchValue } = React.useContext(SearchContext);

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                width="24px"
                height="24px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
            </svg>
            <input
                onChange={event => setSearchValue(event.target.value)}
                className={styles.input}
                value={searchValue}
                type="text"
                placeholder="Szukaj..."
            />

            {searchValue && (
                <svg
                    onClick={() => setSearchValue('')}
                    className={styles.clearIcon}
                    data-name="Layer 1"
                    height="24"
                    id="Layer_1"
                    viewBox="0 0 200 200"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"><title />
                    <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" /></svg>
            )}

        </div>
    )
}

export default Search;