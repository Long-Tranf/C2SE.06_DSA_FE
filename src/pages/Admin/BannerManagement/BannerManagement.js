import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BannerManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function BannerManagement() {
    const [banners, setBanners] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(null);
    const [formData, setFormData] = useState({
        priority: 0, // Mặc định là 0
        is_open: 1, // Sử dụng 1 thay vì true
        image: '', // Hình ảnh chỉ là URL
    });

    // Fetch dữ liệu từ API
    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/ConfigBanners/data',
            );
            setBanners(response.data.configbanners);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    const openEditModal = (banner) => {
        setCurrentBanner(banner);
        setFormData({
            priority: banner.priority,
            is_open: banner.is_open,
            image: banner.image,
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentBanner(null);
        setFormData({
            priority: 0,
            is_open: 1,
            image: '',
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentBanner(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (currentBanner) {
            // Cập nhật banner
            try {
                await axios.put(
                    'http://127.0.0.1:8000/api/ConfigBanners/update',
                    {
                        id: currentBanner.id,
                        ...formData,
                        is_open: formData.is_open,
                    },
                );
                fetchBanners();
                closeModal();
            } catch (error) {
                console.error('Error updating banner:', error);
            }
        } else {
            // Tạo mới banner
            try {
                await axios.post(
                    'http://127.0.0.1:8000/api/ConfigBanners/create',
                    {
                        ...formData,
                        is_open: formData.is_open,
                    },
                );
                fetchBanners();
                closeModal();
            } catch (error) {
                console.error('Error creating banner:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/ConfigBanners/delete/${id}`,
            );
            fetchBanners();
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    return (
        <div className="banner-management">
            <h2>Quản lý Banner</h2>
            <button
                onClick={openAddModal}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Thêm banner mới
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Ưu tiên</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {banners.map((banner) => (
                        <tr key={banner.id}>
                            <td>{banner.id}</td>
                            <td>
                                <img
                                    src={banner.image}
                                    alt="thumbnail"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </td>
                            <td>{banner.priority}</td>
                            <td>{banner.is_open === 1 ? 'Mở' : 'Khóa'}</td>
                            <td>
                                <button
                                    onClick={() => openEditModal(banner)}
                                    className="btn btn-warning mr-2"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(banner.id)}
                                    className="btn btn-danger"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>
                            {currentBanner
                                ? 'Chỉnh sửa banner'
                                : 'Thêm banner mới'}
                        </h3>
                        <div className="form-group">
                            <label>Ưu tiên</label>
                            <select
                                className="form-control"
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                            >
                                {[0, 1, 2, 3].map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                className="form-control"
                                name="is_open"
                                value={formData.is_open}
                                onChange={handleInputChange}
                            >
                                <option value={1}>Mở</option>
                                <option value={0}>Khóa</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Hình ảnh (URL)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                            />
                            {formData.image && (
                                <div className="mt-2">
                                    <img
                                        src={formData.image}
                                        alt="uploaded"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleSave}
                            className="btn btn-primary"
                        >
                            {currentBanner ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                        <button
                            onClick={closeModal}
                            className="btn btn-secondary ml-2"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BannerManagement;
