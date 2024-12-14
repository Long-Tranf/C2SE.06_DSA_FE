import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import PostItem from '~/components/PostItem';
import { SearchIcon } from '~/components/icons';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const navigate = useNavigate(); // Hook để điều hướng

    // Hàm gọi API tìm kiếm
    const fetchSearchResults = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/posts/search?q=${query}`,
            );
            const data = await response.json();
            setSearchResult(data); // Lưu kết quả tìm kiếm vào state
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]); // Nếu không có giá trị tìm kiếm thì không hiển thị kết quả
            return;
        }

        fetchSearchResults(searchValue); // Gọi API mỗi khi searchValue thay đổi
    }, [searchValue]); // Trigger khi searchValue thay đổi

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleSearchClick = () => {
        if (searchValue.trim()) {
            // Điều hướng đến trang tìm kiếm
            navigate(`/search?query=${searchValue}`);
        }
    };

    return (
        <HeadlessTippy
            visible={searchResult.length > 0 && searchValue.trim()}
            interactive
            placement="bottom"
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Results</h4>
                        {searchResult.map((result) => (
                            <PostItem key={result.id} data={result} />
                        ))}
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
