import React, { useState } from 'react';
import './ContantManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContantManagement() {
    const [contents, setContents] = useState([
        {
            id: 1,
            title: 'Tiêu đề 1',
            content: 'Nội dung của bài viết 1',
            senderName: 'Người gửi 1',
            senderEmail: 'sender1@example.com',
            status: 'Đang xử lý',
        },
        {
            id: 2,
            title: 'Tiêu đề 2',
            content: 'Nội dung của bài viết 2',
            senderName: 'Người gửi 2',
            senderEmail: 'sender2@example.com',
            status: 'Hoàn thành',
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        senderName: '',
        senderEmail: '',
        status: 'Đang xử lý',
    });

    const openEditModal = (content) => {
        setCurrentContent(content);
        setFormData({
            title: content.title,
            content: content.content,
            senderName: content.senderName,
            senderEmail: content.senderEmail,
            status: content.status,
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentContent(null);
        setFormData({
            title: '',
            content: '',
            senderName: '',
            senderEmail: '',
            status: 'Đang xử lý',
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
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Tên người gửi</th>
                        <th>Email</th>
                        <th>Tình trạng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {contents.map((content) => (
                        <tr key={content.id}>
                            <td>{content.id}</td>
                            <td>{content.title}</td>
                            <td>{content.content}</td>
                            <td>{content.senderName}</td>
                            <td>{content.senderEmail}</td>
                            <td>{content.status}</td>
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
                            <label>Nội dung</label>
                            <textarea
                                className="form-control"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tên người gửi</label>
                            <input
                                type="text"
                                className="form-control"
                                name="senderName"
                                value={formData.senderName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="senderEmail"
                                value={formData.senderEmail}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tình trạng</label>
                            <select
                                className="form-control"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="Đang xử lý">Đang xử lý</option>
                                <option value="Hoàn thành">Hoàn thành</option>
                            </select>
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
