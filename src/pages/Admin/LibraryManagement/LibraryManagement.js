import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LibraryManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function PhotoLibraryManagement() {
    const [photos, setPhotos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        is_open: 1,
        image: '',
    });

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/PhotoLibrary/data',
            );
            setPhotos(response.data.photo_librarys);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const openEditModal = (photo) => {
        setCurrentPhoto(photo);
        setFormData({
            title: photo.title,
            is_open: photo.is_open,
            image: photo.image,
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentPhoto(null);
        setFormData({
            title: '',
            is_open: 1,
            image: '',
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentPhoto(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prevState) => ({
                ...prevState,
                image: imageUrl,
            }));
        }
    };

    const handleSave = async () => {
        if (currentPhoto) {
            try {
                await axios.put(
                    'http://127.0.0.1:8000/api/PhotoLibrary/update',
                    {
                        id: currentPhoto.id,
                        ...formData,
                        is_open: formData.is_open,
                    },
                );
                fetchPhotos();
                closeModal();
            } catch (error) {
                console.error('Có lỗi xảy ra khi lưu hình ảnh:', error);
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    alert('Không thể lưu hình ảnh. Vui lòng thử lại!');
                }
            }
        } else {
            try {
                await axios.post(
                    'http://127.0.0.1:8000/api/PhotoLibrary/create',
                    {
                        ...formData,
                        is_open: formData.is_open,
                    },
                );
                fetchPhotos();
                closeModal();
            } catch (error) {
                console.error('Có lỗi xảy ra khi thêm hình ảnh:', error);
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    alert('Không thể thêm hình ảnh. Vui lòng thử lại!');
                }
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/PhotoLibrary/delete/${id}`,
            );
            fetchPhotos();
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

    const currentLibraries = photos.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(photos.length / eventsPerPage);

    return (
        <div className="photo-library-management">
            <h2>Thư viện ảnh</h2>
            <button
                onClick={openAddModal}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Thêm ảnh mới
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tiêu đề</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLibraries.map((photo) => (
                        <tr key={photo.id}>
                            <td>{photo.id}</td>
                            <td>
                                <img
                                    src={photo.image}
                                    alt="thumbnail"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </td>
                            <td>{photo.title}</td>
                            <td>{photo.is_open === 1 ? 'Mở' : 'Khóa'}</td>
                            <td>
                                <button
                                    onClick={() => openEditModal(photo)}
                                    className="btn btn-warning mr-2"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(photo.id)}
                                    className="btn btn-danger"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav
                aria-label="Page navigation example"
                className="d-flex justify-content-center mt-3"
            >
                <ul className="pagination">
                    <li
                        className={`page-item ${
                            currentPage === 1 && 'disabled'
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${
                                currentPage === index + 1 ? 'active' : ''
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li
                        className={`page-item ${
                            currentPage === totalPages && 'disabled'
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>
                            {currentPhoto ? 'Chỉnh sửa ảnh' : 'Thêm ảnh mới'}
                        </h3>
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                            {errors.title && (
                                <p className="error-message">
                                    {errors.title[0]}
                                </p>
                            )}
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
                            <label>Hình ảnh (URL hoặc Upload)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                            />
                            <div className="mt-2">
                                {formData.image &&
                                    !formData.image.startsWith('blob:') && (
                                        <img
                                            src={formData.image}
                                            alt="uploaded"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                            }}
                                        />
                                    )}
                            </div>
                            <input
                                type="file"
                                className="form-control mt-2"
                                onChange={handleFileChange}
                            />
                            {errors.image && (
                                <p className="error-message">
                                    {errors.image[0]}
                                </p>
                            )}
                            {formData.image.startsWith('blob:') && (
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
                            {currentPhoto ? 'Cập nhật' : 'Thêm mới'}
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

export default PhotoLibraryManagement;
