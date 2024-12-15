import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsLayout.css';

const NewsLayout = ({ apiUrl, title }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(apiUrl);
                setPosts(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchPosts();
    }, [apiUrl]);

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
        <div className="news-layout-container">
            <div className="header">
                <div>{title}</div>
            </div>

            {posts.length > 0 && (
                <div className="content-news-layout">
                    <img
                        alt="Event image"
                        src={posts[0].image}
                        width="217"
                        height="128"
                    />
                    <div className="details">
                        <h2>{posts[0].title}</h2>
                        <div className="meta-list">
                            <div className="meta-info">
                                <i className="fas fa-calendar-alt"></i>
                                {new Date(
                                    posts[0].created_at,
                                ).toLocaleDateString()}
                            </div>
                            <div className="meta-info">
                                <i className="fas fa-clock"></i>
                                {new Date(
                                    posts[0].created_at,
                                ).toLocaleTimeString()}
                            </div>
                            <div className="meta-info">
                                <i className="fas fa-eye"></i>
                                {posts[0].views}
                            </div>
                        </div>
                        <p
                            className="new-layout-post-desc"
                            dangerouslySetInnerHTML={{
                                __html: removeImagesFromContent(
                                    truncateText(posts[0].content, 310),
                                ), // Giới hạn độ dài và loại bỏ ảnh
                            }}
                        ></p>
                    </div>
                </div>
            )}

            <div className="news-layout-list">
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
