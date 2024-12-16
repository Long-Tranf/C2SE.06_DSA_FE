import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import './GroupProfile.css';

const GroupProfile = () => {
    const { id } = useParams();
    const [association, setAssociation] = useState(null);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/Associations/${id}`)
            .then((response) => {
                setAssociation(response.data);
            })
            .catch((error) => {
                console.error('Có lỗi khi gọi API:', error);
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
                    {articles.map((article) => (
                        <a
                            href={article.url}
                            key={article.id}
                            className="col-md-8 mb-4 article-link"
                        >
                            <div className="card flex-row">
                                <img
                                    src={article.thumbnail}
                                    className="card-img-left img-fluid col-4"
                                    alt={article.title}
                                />
                                <div className="col-8 p-3">
                                    <h5 className="card-title">
                                        {article.title}
                                    </h5>
                                    <p className="card-text">
                                        {article.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

const articles = [
    {
        id: 1,
        title: 'Article Title 1',
        description:
            'A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.',
        thumbnail:
            'https://hoinhabaobacgiang.vn/Includes/NewsImg/1_2024/29736_7-1-1626444923.jpg',
        url: '',
    },
    {
        id: 2,
        title: 'Article Title 2',
        description: 'A brief description of Article 2.',
        thumbnail:
            'https://hoinhabaobacgiang.vn/Includes/NewsImg/1_2024/29736_7-1-1626444923.jpg',
        url: '',
    },
    {
        id: 3,
        title: 'Article Title 3',
        description: 'A brief description of Article 3.',
        thumbnail:
            'https://hoinhabaobacgiang.vn/Includes/NewsImg/1_2024/29736_7-1-1626444923.jpg',
        url: '',
    },
];

export default GroupProfile;
