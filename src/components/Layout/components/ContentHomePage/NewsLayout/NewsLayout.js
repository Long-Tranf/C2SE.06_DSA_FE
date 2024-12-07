import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsLayout.css';

const NewsLayout = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Sử dụng Axios để lấy dữ liệu từ API mock
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <div>Sự Kiện</div>
            </div>

            {posts.length > 0 && (
                <div className="content-news-layout">
                    {/* Bài viết đầu tiên với ảnh */}
                    <img
                        alt="Event image"
                        src={posts[0].image}
                        width="200"
                        height="150"
                    />
                    <div className="details">
                        <h2>{posts[0].title}</h2>
                        <div className="meta-list">
                            <div className="meta-info">
                                <i className="fas fa-calendar-alt"></i>
                                {posts[0].date}
                            </div>
                            <div className="meta-info">
                                <i className="fas fa-clock"></i>
                                {posts[0].time}
                            </div>
                            <div className="meta-info">
                                <i className="fas fa-eye"></i>
                                {posts[0].views}
                            </div>
                        </div>
                        <p>{posts[0].description}</p>
                    </div>
                </div>
            )}

            <div className="news-layout-list">
                {/* Các bài viết còn lại chỉ hiển thị tiêu đề */}
                {posts.slice(1).map((post) => (
                    <a key={post.id} href={`#${post.id}`}>
                        {post.title}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default NewsLayout;
