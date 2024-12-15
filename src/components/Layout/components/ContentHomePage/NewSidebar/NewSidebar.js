import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newSidebar.css';

const NewSidebar = ({ title, apiUrl }) => {
    const [posts, setPosts] = useState([]);

    // Gọi API khi component được mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(apiUrl);
                setPosts(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [apiUrl]); // Chạy lại nếu apiUrl thay đổi

    const removeImagesFromContent = (content) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const images = tempDiv.querySelectorAll('img');
        images.forEach((img) => img.remove());
        return tempDiv.innerHTML;
    };

    const truncateText = (text, length = 50) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };

    return (
        <div className="innerNewSidebar">
            <h4 className="heading">{title}</h4>

            {posts[0] && posts[0].is_open && (
                <div className="first-post">
                    <div className="image">
                        <img src={posts[0].image} alt="" />
                    </div>
                    <h5 className="title">{posts[0].title}</h5>
                    <p
                        className="desc"
                        dangerouslySetInnerHTML={{
                            __html: removeImagesFromContent(
                                truncateText(posts[0].content, 200),
                            ), // Giới hạn độ dài và loại bỏ ảnh
                        }}
                    ></p>
                </div>
            )}

            <div className="related-posts">
                {posts.slice(1).map((post, index) => (
                    <div key={post.id} className="related-post">
                        <a
                            href={`/post/${post.id}`}
                            className="related-post-link"
                            dangerouslySetInnerHTML={{
                                __html: truncateText(post.title, 50), // Giới hạn độ dài và loại bỏ ảnh
                            }}
                        ></a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewSidebar;
