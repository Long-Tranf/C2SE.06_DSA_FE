import React, { useEffect, useState } from 'react';
import './Post.css';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import Breadcrumb from '~/components/Layout/components/Breadcrumb/Breadcumb';
import NewSidebar from '~/components/Layout/components/ContentHomePage/NewSidebar/NewSidebar';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
    const { postId } = useParams();
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Tăng lượt xem
                await axios
                    .get(`http://127.0.0.1:8000/api/posts/view/${postId}`)
                    .then((response) => {
                        console.log('Tăng lượt xem:', response.data);
                    })
                    .catch((error) => {
                        console.error('Lỗi khi tăng lượt xem:', error);
                    });

                // Lấy chi tiết bài viết
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/Post/data/${postId}`,
                );
                setPost(response.data.post);

                // Lấy danh sách bài viết liên quan
                axios
                    .get(
                        `http://127.0.0.1:8000/api/posts/top-excluding/${postId}`,
                    )
                    .then((response) => setRelatedPosts(response.data))
                    .catch((error) => {
                        console.error(
                            'Lỗi khi lấy danh sách bài viết liên quan:',
                            error,
                        );
                    });
            } catch (error) {
                console.error('Lỗi khi tải bài viết:', error);
            }
        };

        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        {
            name: post.category.category_name,
            link: `/category/${post.category.id}`,
        },
        { name: post.title, active: true },
    ];

    // Kiểm tra nếu bài viết bị ẩn
    if (post.is_open === 0) {
        return (
            <div className="wrapper">
                <Header />
                <div className="breadcrumb-container bredcrumb-post">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <div className="content-container">
                    <div className="post-content">
                        <h1>Bài viết tạm thời bị ẩn</h1>
                        <p>
                            Bài viết này hiện không khả dụng. Vui lòng quay lại
                            sau.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="breadcrumb-container bredcrumb-post">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="content-container">
                <div className="post-content">
                    <h1>{post.title}</h1>
                    <div className="meta-container">
                        <div className="meta-list">
                            <div className="meta-info">
                                <i className="fas fa-calendar-alt meta-info-icon"></i>
                                <p>
                                    {new Date(
                                        post.created_at,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="meta-info">
                                <i className="fas fa-clock meta-info-icon"></i>
                                <p>
                                    {new Date(
                                        post.created_at,
                                    ).toLocaleTimeString()}
                                </p>
                            </div>
                            <div className="meta-info">
                                <i className="fas fa-eye meta-info-icon"></i>
                                <p>{post.view}</p>
                            </div>
                        </div>
                        <div className="association-info">
                            <Link to={`/association/${post.association.id}`}>
                                <img
                                    src={post.association.avatar}
                                    alt="Association"
                                    className="association-image"
                                />
                                <p className="association-name">
                                    {post.association.company_name}
                                </p>
                            </Link>
                        </div>
                    </div>

                    <div className="post-body">
                        <div
                            className="content-output"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                    <div className="author">
                        <p>
                            <strong>Tác giả: </strong>
                            {post.association.registrant_name}
                        </p>
                    </div>
                    <div className="related-posts-news">
                        <h3>Bài viết liên quan</h3>
                        <div
                            className={`related-post-list ${
                                relatedPosts.length < 3
                                    ? 'related-post-few'
                                    : ''
                            }`}
                        >
                            {relatedPosts.map((post) => (
                                <div
                                    className="related-post-new-item"
                                    key={post.id}
                                >
                                    <img src={post.image} alt="Related 1" />
                                    <Link
                                        to={`/post/${post.id}`}
                                        className="related-post-new-title"
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="sidebar-post">
                    <NewSidebar
                        title="Bài Viết Mới nhất"
                        apiUrl="http://127.0.0.1:8000/api/Posts/latest-five"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Post;
