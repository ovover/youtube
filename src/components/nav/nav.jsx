import React, { memo } from 'react';
import styles from './nav.module.css';

const Nav = memo((props) => {

    const searchRef = React.createRef();

    const onSubmit = event => {
        event.preventDefault();
        const searchKeyword = searchRef.current.value;
        // console.log(props);
        searchKeyword && props.onSearch(searchKeyword);
    }

    return (
        <form className={styles.bar} onSubmit={onSubmit}>
            <span className={styles.logo}>YouTube</span>
            <input className={styles.searchInput} ref={searchRef} type="text" />
            <button className={styles.searchButton}>Search</button>
        </form>
    );
});

export default Nav;