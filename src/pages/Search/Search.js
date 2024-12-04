import React, { useState } from 'react';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import styles from './Search.module.scss'; // Import CSS module

function Search() {
    const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [searchQuery, setSearchQuery] = useState(''); // Từ khóa tìm kiếm
    const [sortOption, setSortOption] = useState('newest'); // Tùy chọn sắp xếp
    const resultsPerPage = 5; // Số kết quả mỗi trang

    // Mock API giả lập
    const mockApiCall = (query) => {
        const mockData = [
            // Dữ liệu giả ở đây
            {
                id: 1,
                title: 'Bài viết 1',
                content: 'Nội dung bài viết 1',
                createdAt: '2024-01-01',
                views: 100,
                image: 'image_url_1',
            },
            {
                id: 2,
                title: 'Bài viết 2',
                content: 'Nội dung bài viết 2',
                createdAt: '2024-02-01',
                views: 150,
                image: 'image_url_2',
            },
            {
                id: 3,
                title: 'Bài viết 3',
                content: 'Nội dung bài viết 3',
                createdAt: '2024-03-01',
                views: 50,
                image: 'image_url_3',
            },
            {
                id: 4,
                title: 'Bài viết 4',
                content: 'Nội dung bài viết 4',
                createdAt: '2024-02-01',
                views: 100,
                image: 'image_url_4',
            },
            {
                id: 5,
                title: 'Bài viết 5',
                content: 'Nội dung bài viết 5',
                createdAt: '2024-01-01',
                views: 51,
                image: 'image_url_5',
            },
            {
                id: 6,
                title: 'Bài viết 6',
                content: 'Nội dung bài viết 6',
                createdAt: '2024-03-02',
                views: 155,
                image: 'image_url_6',
            },
            // Thêm các bài viết giả vào đây
        ];

        return mockData.filter(
            (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.content.toLowerCase().includes(query.toLowerCase()),
        );
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            alert('Vui lòng nhập từ khóa tìm kiếm!');
            return;
        }

        const filteredResults = mockApiCall(searchQuery);
        setSearchResults(filteredResults); // Lưu trữ kết quả tìm kiếm
        setCurrentPage(1); // Reset trang về 1 khi tìm kiếm lại
    };

    const handleSortChange = (option) => {
        setSortOption(option); // Thay đổi tùy chọn sắp xếp
        setCurrentPage(1); // Reset trang khi thay đổi sắp xếp
    };

    // Sắp xếp kết quả
    const sortedResults = [...searchResults].sort((a, b) => {
        if (sortOption === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortOption === 'mostRelevant') {
            return a.title.localeCompare(b.title);
        } else if (sortOption === 'mostViewed') {
            return b.views - a.views;
        }
        return 0;
    });

    // Phân trang
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = sortedResults.slice(
        indexOfFirstResult,
        indexOfLastResult,
    );

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    className={`form-control ${styles.searchInput}`} // Áp dụng CSS module
                    placeholder="Nhập nội dung tìm kiếm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                    Tìm kiếm
                </button>
            </div>

            <div
                className={`${styles.dFlex} ${styles.justifyContentBetween} ${styles.alignItemsCenter}`}
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
                                onClick={() => handleSortChange('mostViewed')}
                            >
                                Xem nhiều nhất
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.searchResults}>
                {currentResults.map((result) => (
                    <div
                        key={result.id}
                        className={`${styles.dFlex} border-bottom py-2`}
                    >
                        <img
                            src={result.image}
                            alt={result.title}
                            className={styles.searchItemImage}
                        />
                        <div className={styles.searchItemContent}>
                            <h5>{result.title}</h5>
                            <p className="text-truncate">{result.content}</p>
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
