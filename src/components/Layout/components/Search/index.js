import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import PostItem from '~/components/PostItem';
import { SearchIcon } from '~/components/icons';
import AssociationItem from '~/components/AssociationItem/AssociationItem';
import styles from './Search.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [associations, setAssociations] = useState([]);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const navigate = useNavigate();

    const fetchSearchResults = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8000/api/posts/recommend?q=${query}`,
            );
            const data = await response.json();
            setSearchResult(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setLoading(false);
        }
    };

    const fetchAssociations = async (query) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/Associations/recommend?q=${query}`,
            );
            setAssociations(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching associations:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchValue.trim()) {
            fetchSearchResults(searchValue);
            fetchAssociations(searchValue);
        } else {
            setSearchResult([]);
            setAssociations([]);
            setLoading(false);
        }
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        setAssociations([]);
        setLoading(false);
        inputRef.current.focus();
    };

    const handleSearchClick = () => {
        if (searchValue.trim()) {
            navigate(`/search?query=${searchValue}`);
        }
    };

    const hasPosts = searchResult.length > 0;
    const hasAssociations = associations.length > 0;

    return (
        <HeadlessTippy
            visible={searchResult.length > 0 && searchValue.trim()}
            interactive
            placement="bottom"
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {hasPosts && (
                            <>
                                <h4 className={cx('search-title')}>Posts</h4>
                                {searchResult.map((result) => (
                                    <PostItem key={result.id} data={result} />
                                ))}
                            </>
                        )}
                        {hasAssociations && (
                            <>
                                <h4 className={cx('search-title')}>
                                    Associations
                                </h4>
                                {associations.map((association) => (
                                    <AssociationItem
                                        key={association.id}
                                        data={association}
                                    />
                                ))}
                            </>
                        )}
                    </PopperWrapper>
                </div>
            )}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search posts and association"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && (
                    <FontAwesomeIcon
                        className={cx('loading')}
                        icon={faSpinner}
                    />
                )}

                <button
                    className={cx('search-btn')}
                    onClick={handleSearchClick}
                >
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
