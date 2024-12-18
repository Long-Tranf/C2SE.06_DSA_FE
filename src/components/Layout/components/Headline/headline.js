import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom';
import './headline.css';

function Headline() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [speed, setSpeed] = useState(50);
    const [direction, setDirection] = useState('left');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/top')
            .then((response) => response.json())
            .then((data) => {
                const filteredPosts = data.filter((post) => post.is_open === 1);
                setPosts(filteredPosts);
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error);
            });
    }, []);

    const handleNavigate = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleMouseEnterSpan = () => {
        setSpeed(0); // Dừng marquee khi hover vào span
    };

    const handleMouseLeaveSpan = () => {
        setSpeed(50); // Khôi phục tốc độ marquee
    };

    const handleMouseEnterTitle = () => {
        setDirection('right'); // Đổi hướng marquee
    };

    const handleMouseLeaveTitle = () => {
        setDirection('left'); // Khôi phục hướng mặc định
    };

    return (
        <div className="headline-container">
            <div
                className="headline-left"
                onMouseEnter={handleMouseEnterTitle}
                onMouseLeave={handleMouseLeaveTitle}
            >
                <div className="headline-left-content">
                    <h2 className="headline-title">Nổi Bật</h2>
                </div>
            </div>
            <div className="headline-right">
                <div className="marquee-container">
                    <Marquee speed={speed} direction={direction}>
                        {posts.map((post) => (
                            <span
                                key={post.id}
                                className="headline-link"
                                onClick={() => handleNavigate(post.id)}
                                onMouseEnter={handleMouseEnterSpan}
                                onMouseLeave={handleMouseLeaveSpan}
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
