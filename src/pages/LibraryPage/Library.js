import React, { useState, useEffect } from 'react';
import './Library.css';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import Breadcrumb from '~/components/Layout/components/Breadcrumb/Breadcumb';
import axios from 'axios';

const Library = () => {
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'Dành cho Hội Viên', active: false },
        { name: 'Thư Viện ảnh ', active: true },
    ];

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                setIsLoggedIn(true);
                try {
                    const response = await axios.get(
                        'http://127.0.0.1:8000/api/kiem-tra-token-member',
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        },
                    );

                    if (response.data.status) {
                        const photoResponse = await axios.get(
                            'http://127.0.0.1:8000/api/PhotoLibrary/data',
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            },
                        );
                        const filteredImages =
                            photoResponse.data.photo_librarys.filter(
                                (image) => image.is_open === 1,
                            );
                        setImages(filteredImages);
                    } else {
                        // Nếu token không hợp lệ, yêu cầu đăng nhập lại
                        setIsLoggedIn(false);
                    }
                } catch (error) {
                    setIsLoggedIn(false);
                    console.error(
                        'Error verifying token or fetching images:',
                        error,
                    );
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        checkAccessToken();
    }, []);

    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length,
        );
    };

    return (
        <div className="wrapper">
            <Header />
            <div className="library-container">
                <h2 className="library-heading">Thư Viện Hình Ảnh</h2>
                <div className="breadcrumb-container">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <div className="library-list">
                    {isLoggedIn ? (
                        <div className="image-grid">
                            {images.map((image, index) => (
                                <div
                                    className="image-item"
                                    key={image.id}
                                    onClick={() => openModal(index)}
                                >
                                    <img
                                        src={image.image}
                                        alt={`Library Image ${index + 1}`}
                                    ></img>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="access-warning">
                            Đây là nội dung cho hội viên. Bạn cần{' '}
                            <a href="/login">đăng nhập</a> để xem thư viện.
                        </p>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content-library"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={closeModal}>
                            X
                        </button>
                        <button className="modal-prev" onClick={prevImage}>
                            ‹
                        </button>
                        <img
                            src={images[currentImageIndex].image}
                            alt="Current Image"
                            className="modal-image"
                        />
                        <button className="modal-next" onClick={nextImage}>
                            ›
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Library;
