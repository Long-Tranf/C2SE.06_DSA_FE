import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import './GroupProfile.css';

const GroupProfile = () => {
    const { id } = useParams();
    const [association, setAssociation] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Default to page 1
    //const [totalPages, setTotalPages] = useState(1); // To hold total number of pages
    const resultsPerPage = 6; // Number of posts per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const associationResponse = await axios.get(
                    `http://127.0.0.1:8000/api/Associations/${id}`,
                );
                setAssociation(associationResponse.data);

                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    try {
                        const verifyResponse = await axios.get(
                            'http://127.0.0.1:8000/api/kiem-tra-token-member',
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            },
                        );

                        if (verifyResponse.data.status) {
                            setIsLoggedIn(true);
                            fetchPosts(accessToken);
                        } else {
                            setIsLoggedIn(false);
                        }
                    } catch (error) {
                        setIsLoggedIn(false);
                        console.error('Error verifying token:', error);
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Có lỗi khi gọi API:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, currentPage]);

    const fetchPosts = async (accessToken) => {
        try {
            const postsResponse = await axios.get(
                `http://127.0.0.1:8000/api/posts/member/${id}?page=${currentPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            setPosts(postsResponse.data.posts);
            //setTotalPages(postsResponse.data.total_pages); // Assuming the API provides total number of pages
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Handle pagination on client side
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = posts.slice(indexOfFirstResult, indexOfLastResult);

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (!association) {
        return <div>Không tìm thấy thông tin hiệp hội.</div>;
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 text-center assoction-profile-info">
                        <img
                            src={
                                association.avatar ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBS9bJEXw5AYRgmLY_9Nyr79oQFPYEtJjmhA&s'
                            }
                            className="association_avatar"
                            alt="Profile"
                            width="150"
                            height="150"
                        />
                        <h1 className="channel">{association.company_name}</h1>
                        <div className="channel-info">
                            <p>Website :</p>
                            <a
                                href={association.website}
                                className="link-association"
                            >
                                {association.website}
                            </a>
                        </div>
                        <div className="channel-info">
                            <p>Address :</p>
                            <p className="link-association">
                                {association.address}
                            </p>
                        </div>
                        <div className="channel-info">
                            <p>Phone Number :</p>
                            <p className="link-association">
                                {association.phone_number}
                            </p>
                        </div>
                        <div className="heading-content-post">
                            <h2>Bài Viết</h2>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 flex-column align-items-center">
                    {isLoggedIn ? (
                        currentResults.map((post) => (
                            <div
                                key={post.id}
                                className="col-md-8 mb-4 article-link"
                            >
                                <div className="card flex-row">
                                    <img
                                        src={post.image}
                                        className="card-img-left img-fluid col-4"
                                        alt={post.title}
                                    />
                                    <div className="col-8 p-3">
                                        <Link
                                            to={`/post/${post.id}`}
                                            className="card-title"
                                        >
                                            {post.title}
                                        </Link>
                                        <p className="card-text">
                                            {post.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="access-warning">
                            Bạn cần{' '}
                            <Link to="/login" className="login-link">
                                đăng nhập
                            </Link>{' '}
                            để xem tất cả bài viết của hội viên này.
                        </p>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="pagination-controls">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li
                                className={`page-item ${
                                    currentPage === 1 && 'disabled'
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {Array.from(
                                {
                                    length: Math.ceil(
                                        posts.length / resultsPerPage,
                                    ),
                                },
                                (_, index) => {
                                    // const pageNumber = index + 1;
                                    // // Optionally, limit how many pages you show (e.g., around the current page)
                                    // if (
                                    //     pageNumber >= currentPage - 2 &&
                                    //     pageNumber <= currentPage + 2
                                    // )
                                    {
                                        return (
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
                                                        setCurrentPage(
                                                            index + 1,
                                                        )
                                                    }
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        );
                                    }
                                    //return null;
                                },
                            )}
                            <li
                                className={`page-item ${
                                    currentPage ===
                                        Math.ceil(
                                            posts.length / resultsPerPage,
                                        ) && 'disabled'
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                    disabled={
                                        currentPage ===
                                        Math.ceil(posts.length / resultsPerPage)
                                    }
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GroupProfile;
