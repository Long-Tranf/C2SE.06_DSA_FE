import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom';
import './headline.css';

function Headline() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API lấy danh sách bài viết
        fetch('http://127.0.0.1:8000/api/posts/top')
            .then((response) => response.json())
            .then((data) => {
                // Lọc bài viết chỉ lấy các bài có `is_open` = 1
                const filteredPosts = data.filter((post) => post.is_open === 1);
                setPosts(filteredPosts);
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error);
            });
    }, []);

    const handleNavigate = (postId) => {
        // Điều hướng đến đường dẫn bài viết
        navigate(`/post/${postId}`);
    };

    return (
        <div className="headline-container">
            <div className="headline-left">
                <div className="headline-left-content">
                    <h2 className="headline-title">Nổi Bật</h2>
                </div>
            </div>
            <div className="headline-right">
                <div className="marquee-container">
                    <Marquee>
                        {posts.map((post) => (
                            <span
                                key={post.id}
                                className="headline-link"
                                onClick={() => handleNavigate(post.id)}
                            >
                                {post.title}
                            </span>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
}

export default Headline;
