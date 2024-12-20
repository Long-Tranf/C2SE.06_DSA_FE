import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import styles from './Search.module.scss';

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('newest');
    const resultsPerPage = 5;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);

    const fetchSearchResults = async (query) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/posts/search?q=${query}`,
            );
            const data = await response.json();

            console.log('Search Results from API:', data); // Log kết quả từ API
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        setCurrentPage(1);
    };

    const countKeywordOccurrences = (text, query) => {
        const regex = new RegExp(`\\b${query}\\b`, 'gi'); // Tìm từ khóa chính xác
        const matches = text ? text.match(regex) : [];
        return matches ? matches.length : 0;
    };

    const sortedResults = [...searchResults].sort((a, b) => {
        if (sortOption === 'newest') {
            return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortOption === 'mostRelevant') {
            const countA =
                countKeywordOccurrences(a.title, query) +
                countKeywordOccurrences(a.content, query);
            const countB =
                countKeywordOccurrences(b.title, query) +
                countKeywordOccurrences(b.content, query);

            // Log để kiểm tra độ phù hợp
            console.log(`Post A: ${a.title}, Count: ${countA}`);
            console.log(`Post B: ${b.title}, Count: ${countB}`);

            return countB - countA; // Sắp xếp giảm dần theo số lần xuất hiện
        } else if (sortOption === 'oldest') {
            return new Date(a.created_at) - new Date(b.created_at);
        }
        return 0;
    });

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = sortedResults.slice(
        indexOfFirstResult,
        indexOfLastResult,
    );

    const removeImagesFromContent = (content) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const images = tempDiv.querySelectorAll('img');
        images.forEach((img) => img.remove());
        return tempDiv.innerHTML;
    };

    const truncateText = (text, length = 100) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };

    return (
        <div>
            <Header />
            <div
                className={`${styles.dFlex} ${styles.justifyContentBetween} ${styles.alignItemsCenter} ${styles.SearchWrapper}`}
            >
                <h2 className={styles.searchTitle}>
                    {searchResults.length > 0
                        ? `Tìm thấy ${searchResults.length} kết quả`
                        : 'Không có kết quả nào'}
                </h2>
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Sắp xếp
                    </button>
                    <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => handleSortChange('newest')}
                            >
                                Mới nhất
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => handleSortChange('mostRelevant')}
                            >
                                Phù hợp nhất
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => handleSortChange('oldest')}
                            >
                                Cũ nhất
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.searchResults}>
                {currentResults.map((result) => (
                    <div
                        key={result.id}
                        className={`${styles.dFlex} ${styles.searchPost}`}
                    >
                        <img
                            src={result.image}
                            alt={result.title}
                            className={styles.searchItemImage}
                        />
                        <div className={styles.searchItemContent}>
                            <Link
                                to={`/post/${result.id}`}
                                className={styles.searchTitlePost}
                            >
                                {result.title}
                            </Link>
                            <div
                                className={styles.searchDescriptionPost}
                                dangerouslySetInnerHTML={{
                                    __html: removeImagesFromContent(
                                        truncateText(result.content, 600),
                                    ),
                                }}
                            />
                            <div className={styles.infoPost}>
                                <i
                                    className={`fas fa-eye ${styles.searchInfoIcon}`}
                                ></i>
                                <p className={styles.searchInfoView}>
                                    {result.view}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {searchResults.length > resultsPerPage && (
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li
                            className={`page-item ${
                                currentPage === 1 && 'disabled'
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from(
                            {
                                length: Math.ceil(
                                    searchResults.length / resultsPerPage,
                                ),
                            },
                            (_, index) => (
                                <li
                                    key={index + 1}
                                    className={`page-item ${
                                        currentPage === index + 1
                                            ? 'active'
                                            : ''
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ),
                        )}
                        <li
                            className={`page-item ${
                                currentPage ===
                                    Math.ceil(
                                        searchResults.length / resultsPerPage,
                                    ) && 'disabled'
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={
                                    currentPage ===
                                    Math.ceil(
                                        searchResults.length / resultsPerPage,
                                    )
                                }
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
            <Footer />
        </div>
    );
}

export default Search;
