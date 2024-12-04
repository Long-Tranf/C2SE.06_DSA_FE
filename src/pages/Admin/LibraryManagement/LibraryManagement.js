import React, { useState } from 'react';
import './LibraryManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContantManagement() {
    const [contents, setContents] = useState([
        {
            id: 1,
            url: 'https://example.com/link1',
            title: 'Tiêu đề 1',
            isOpen: true,
            imageUrl: 'https://via.placeholder.com/50', // Thêm trường imageUrl
        },
        {
            id: 2,
            url: 'https://example.com/link2',
            title: 'Tiêu đề 2',
            isOpen: false,
            imageUrl: 'https://via.placeholder.com/50', // Thêm trường imageUrl
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        isOpen: true,
        imageUrl: '', // Thêm trường imageUrl
    });

    const openEditModal = (content) => {
        setCurrentContent(content);
        setFormData({
            url: content.url,
            title: content.title,
            isOpen: content.isOpen,
            imageUrl: content.imageUrl, // Thêm trường imageUrl
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentContent(null);
        setFormData({
            url: '',
            title: '',
            isOpen: true,
            imageUrl: '', // Thêm trường imageUrl
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentContent(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prevState) => ({
                ...prevState,
                imageUrl: reader.result, // Lấy dữ liệu hình ảnh
            }));
        };
        if (file) {
            reader.readAsDataURL(file); // Đọc ảnh dưới dạng base64
        }
    };

    const handleUpdateContent = () => {
        setContents(
            contents.map((content) =>
                content.id === currentContent.id
                    ? { ...content, ...formData }
                    : content,
            ),
        );
        closeModal();
    };

    const handleAddContent = () => {
        const newContent = {
            id: contents.length + 1,
            ...formData,
        };
        setContents([...contents, newContent]);
        closeModal();
    };

    const handleDeleteContent = (id) => {
        const newContents = contents.filter((content) => content.id !== id);
        setContents(newContents);
    };

    return (
        <div className="content-management">
            <h2>Quản lý Nội dung</h2>
            <button
                onClick={openAddModal}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Thêm mới
            </button>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Đường dẫn</th>
                        <th>Tiêu đề</th>
                        <th>Trạng thái mở</th>
                        <th>Hình ảnh</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {contents.map((content) => (
                        <tr key={content.id}>
                            <td>{content.id}</td>
                            <td>{content.url}</td>
                            <td>{content.title}</td>
                            <td>{content.isOpen ? 'Mở' : 'Đóng'}</td>
                            <td>
                                <img
                                    src={content.imageUrl}
                                    alt="thumbnail"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() => openEditModal(content)}
                                    className="btn btn-warning mr-2"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteContent(content.id)
                                    }
                                    className="btn btn-danger"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal chỉnh sửa */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>
                            {currentContent
                                ? 'Chỉnh sửa Nội dung'
                                : 'Thêm mới Nội dung'}
                        </h3>
                        <div className="form-group">
                            <label>Đường dẫn</label>
                            <input
                                type="text"
                                className="form-control"
                                name="url"
                                value={formData.url}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái mở</label>
                            <select
                                className="form-control"
                                name="isOpen"
                                value={formData.isOpen}
                                onChange={handleInputChange}
                            >
                                <option value={true}>Mở</option>
                                <option value={false}>Đóng</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Hình ảnh</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleImageUpload}
                            />
                            {formData.imageUrl && (
                                <div className="mt-2">
                                    <img
                                        src={formData.imageUrl}
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
                            onClick={
                                currentContent
                                    ? handleUpdateContent
                                    : handleAddContent
                            }
                            className="btn btn-primary"
                        >
                            {currentContent ? 'Cập nhật' : 'Thêm mới'}
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

export default ContantManagement;
