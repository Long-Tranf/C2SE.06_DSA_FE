import React, { useState } from 'react';
import './Library.css';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';

const Library = () => {
    const images = [
        'https://upload.wikimedia.org/wikipedia/commons/4/46/Canon_200-400_1Dc-1.jpg',
        'https://nld.mediacdn.vn/Images/Uploaded/Share/2010/09/18/10-image001.jpg',
        'https://via.placeholder.com/200x200?text=Image+3',
        'https://via.placeholder.com/200x200?text=Image+4',
        'https://via.placeholder.com/200x200?text=Image+5',
        'https://via.placeholder.com/200x200?text=Image+6',
        'https://via.placeholder.com/200x200?text=Image+7',
        'https://via.placeholder.com/200x200?text=Image+8',
        'https://via.placeholder.com/200x200?text=Image+9',
        'https://via.placeholder.com/200x200?text=Image+10',
        'https://via.placeholder.com/200x200?text=Image+11',
        'https://via.placeholder.com/200x200?text=Image+12',
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
                <h2>Thư Viện Hình Ảnh</h2>
                <div className="image-grid">
                    {images.map((image, index) => (
                        <div
                            className="image-item"
                            key={index}
                            onClick={() => openModal(index)}
                        >
                            <img
                                src={image}
                                alt={`Library Image ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={closeModal}>
                            X
                        </button>
                        <button className="modal-prev" onClick={prevImage}>
                            ‹
                        </button>
                        <img
                            src={images[currentImageIndex]}
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
