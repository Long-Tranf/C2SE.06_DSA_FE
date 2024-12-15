import { useState, useEffect } from 'react';
import './newsMain.css';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NewsMain = () => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/latest')
            .then((response) => response.json())
            .then((data) => {
                setPost(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!post) {
        return <div>Loading...</div>;
    }

    const { title, image, created_at, content } = post;

    const removeImagesFromContent = (content) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const images = tempDiv.querySelectorAll('img');
        images.forEach((img) => img.remove()); // Loại bỏ ảnh
        return tempDiv.innerHTML; // Trả ra HTML không có ảnh
    };

    const truncateText = (text, length = 100) => {
        if (text.length > length) {
            return text.substring(0, length) + '...'; // Cắt văn bản và thêm "..."
        }
        return text;
    };

    return (
        <div className="innerNewMain">
            <div className="imageNewMain">
                <img src={image} alt={title} />
            </div>
            <div className="boxNewsMain">
                <h3 className="headingNewMain">
                    <Link to={`/post/${post.id}`} className="heading-link">
                        {title}
                    </Link>
                </h3>
                <div className="meta">
                    <span>
                        <i className="fas fa-calendar-alt"></i>{' '}
                        {new Date(created_at).toLocaleDateString()}
                    </span>
                    <span>
                        <i className="fas fa-clock"></i>{' '}
                        {new Date(created_at).toLocaleTimeString()}
                    </span>
                    <span>
                        <i className="fas fa-eye"></i> {post.view}
                    </span>
                </div>
                <p
                    className="descNewMain"
                    dangerouslySetInnerHTML={{
                        __html: removeImagesFromContent(
                            truncateText(content, 350),
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default NewsMain;
