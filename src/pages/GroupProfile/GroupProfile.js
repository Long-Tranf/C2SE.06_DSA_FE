import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import './GroupProfile.css';

const GroupProfile = () => {
    const { id } = useParams();
    const [association, setAssociation] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/Associations/${id}`)
            .then((response) => {
                setAssociation(response.data);
            })
            .catch((error) => {
                console.error('Có lỗi khi gọi API:', error);
            });

        axios
            .get(`http://127.0.0.1:8000/api/posts/member/${id}`)
            .then((response) => {
                console.log(response);
                setPosts(response.data.posts);
                console.log(posts);
            })
            .catch((error) => {
                console.log(
                    'Có lỗi khi gọi API bài viết theo Association:',
                    error,
                );
            });
    }, [id]);

    if (!association) {
        return <div>Loading...</div>;
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 text-center assoction-profile-info">
                        <img
                            src={
                                association.avatar ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBS9bJEXw5AYRgmLY_9Nyr79oQFPYEtJjmhA&s'
                            }
                            className="association_avatar"
                            alt="Profile"
                            width="150"
                            height="150"
                        />
                        <h1 className="channel">{association.company_name}</h1>
                        <div className="channel-info">
                            <p>Website :</p>
                            <a
                                href={association.website}
                                className="link-association"
                            >
                                {association.website}
                            </a>
                        </div>
                        <div className="channel-info">
                            <p>Address :</p>
                            <p className="link-association">
                                {association.address}
                            </p>
                        </div>
                        <div className="channel-info">
                            <p>Phone Number :</p>
                            <p className="link-association">
                                {association.phone_number}
                            </p>
                        </div>
                        <div className="heading-content-post">
                            <h2>Bài Viết</h2>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 flex-column align-items-center">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="col-md-8 mb-4 article-link"
                        >
                            <div className="card flex-row">
                                <img
                                    src={post.image}
                                    className="card-img-left img-fluid col-4"
                                    alt={post.title}
                                />
                                <div className="col-8 p-3">
                                    <Link
                                        to={`/post/${post.id}`}
                                        className="card-title"
                                    >
                                        {post.title}
                                    </Link>
                                    <p className="card-text">
                                        {post.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GroupProfile;
