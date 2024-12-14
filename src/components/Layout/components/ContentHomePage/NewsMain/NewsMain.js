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

    const { title, image, created_at, updated_at, content } = post;

    return (
        <div className="innerNewMain">
            <div className="imageNewMain">
                <img src={image} alt={title} />
            </div>
            <div className="boxNewsMain">
                <h3 className="headingNewMain">
                    <Link to="/newdetail" className="heading-link">
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
                        {new Date(updated_at).toLocaleTimeString()}
                    </span>
                    <span>
                        <i className="fas fa-eye"></i> {1000}
                    </span>
                </div>
                <p
                    className="descNewMain"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    );
};

export default NewsMain;
