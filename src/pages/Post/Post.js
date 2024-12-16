import React, { useEffect, useState } from 'react';
import './Post.css';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import Breadcrumb from '~/components/Layout/components/Breadcrumb/Breadcumb';
import NewSidebar from '~/components/Layout/components/ContentHomePage/NewSidebar/NewSidebar';
import { useParams } from 'react-router-dom';

const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/Post/data/${postId}`,
                );
                const data = await response.json();
                setPost(data.post);
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
            link: `/category/${post.category.category_id}`,
        },
        { name: post.title, active: true },
    ];

    return (
        <div className="wrapper">
            <Header />
            <div className="breadcrumb-container bredcrumb-post">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="content-container">
                <div className="post-content">
                    <h1>{post.title}</h1>
                    <div className="meta-list">
                        <div className="meta-info">
                            <i className="fas fa-calendar-alt meta-info-icon"></i>
                            <p>
                                {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="meta-info">
                            <i className="fas fa-clock meta-info-icon"></i>
                            <p>
                                {new Date(post.created_at).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="meta-info">
                            <i className="fas fa-eye meta-info-icon"></i>
                            <p>{post.view}</p>
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
                        <div className="related-post-list">
                            <div className="related-post-new-item">
                                <img src="image1.jpg" alt="Related 1" />
                                <p>Bài viết 1</p>
                            </div>
                            <div className="related-post-new-item">
                                <img src="image2.jpg" alt="Related 2" />
                                <p>Bài viết 2</p>
                            </div>
                            <div className="related-post-new-item">
                                <img src="image3.jpg" alt="Related 3" />
                                <p>Bài viết 3</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar-post">
                    <NewSidebar
                        title="Bài Viết Mới nhất"
                        apiUrl="http://127.0.0.1:8000/api/posts/latest/14"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Post;
