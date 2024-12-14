import React, { useState, useEffect } from 'react';
import './Library.css';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import axios from 'axios';

const Library = () => {
    const [images, setImages] = useState([]); // Dữ liệu hình ảnh từ API
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Fetch dữ liệu từ API khi component được mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8000/api/PhotoLibrary/data',
                );
                // Lọc các ảnh có trường 'is_open' = 1
                const filteredImages = response.data.photo_librarys.filter(
                    (image) => image.is_open === 1,
                );
                setImages(filteredImages); // Cập nhật danh sách ảnh đã lọc
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []); // Chạy 1 lần khi component được render lần đầu

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
                            key={image.id} // Dùng 'id' làm key để tránh bị lỗi
                            onClick={() => openModal(index)}
                        >
                            <img
                                src={image.image} // Sử dụng đường dẫn hình ảnh từ API
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
                            src={images[currentImageIndex].image} // Hiển thị ảnh từ API
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
