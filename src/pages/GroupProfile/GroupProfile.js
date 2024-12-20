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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API lấy thông tin hiệp hội
                const associationResponse = await axios.get(
                    `http://127.0.0.1:8000/api/Associations/${id}`,
                );
                setAssociation(associationResponse.data);

                // Kiểm tra accessToken
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    try {
                        // Xác minh token
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

                            // Gọi API lấy bài viết
                            const postsResponse = await axios.get(
                                `http://127.0.0.1:8000/api/posts/member/${id}`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                },
                            );
                            setPosts(postsResponse.data.posts);
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
    }, [id]);

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
                        posts.map((post) => (
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
            </div>
            <Footer />
        </div>
    );
};

export default GroupProfile;
