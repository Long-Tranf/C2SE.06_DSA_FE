import React, { useEffect, useState } from 'react';
import './Post.css';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import Breadcrumb from '~/components/Layout/components/Breadcrumb/Breadcumb';
import NewSidebar from '~/components/Layout/components/ContentHomePage/NewSidebar/NewSidebar';

const Post = () => {
    const [post, setPost] = useState(null); // State lưu dữ liệu bài viết
    const categoryName = 'Bài viết';
    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'Category', link: '/category' },
        { name: categoryName, active: true },
    ];

    // Lấy bài viết từ API
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('http://localhost:5000/posts/1');
                const data = await response.json();
                setPost(data); // Cập nhật dữ liệu vào state
            } catch (error) {
                console.error('Lỗi khi tải bài viết:', error);
            }
        };

        fetchPost();
    }, []); // Chạy 1 lần khi component render

    if (!post) {
        return <div>Loading...</div>; // Nếu dữ liệu chưa được tải về, hiển thị loading
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
                    <div className="post-meta">
                        <span>
                            <i className="fa fa-calendar"></i> 12/12/2024
                        </span>
                        <span>
                            <i className="fa fa-eye"></i> 500 lượt xem
                        </span>
                    </div>
                    <div className="post-body">
                        {/* Sử dụng dangerouslySetInnerHTML để render nội dung HTML */}
                        <div
                            className="content-output"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                    <div className="author">
                        <p>
                            <strong>Tác giả: </strong>
                            {post.author}
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
                    <NewSidebar />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Post;
