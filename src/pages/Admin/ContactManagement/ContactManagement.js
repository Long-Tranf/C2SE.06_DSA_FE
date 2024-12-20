import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContantManagement() {
    const [contacts, setContacts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/Contact/data')
            .then((response) => {
                setContacts(response.data.contacts);
            })
            .catch((error) => {
                console.error('Có lỗi khi lấy dữ liệu: ', error);
            });
    }, []);

    const openViewModal = (content) => {
        setCurrentContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentContent(null);
    };

    const handleDeleteContent = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/Contact/delete${id}`)
            .then((response) => {
                const newContacts = contacts.filter(
                    (content) => content.id !== id,
                );
                setContacts(newContacts);
                alert('Xóa thành công!');
            })
            .catch((error) => {
                console.error('Có lỗi khi xóa nội dung: ', error);
                alert('Có lỗi xảy ra khi xóa!');
            });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 6;

    const indexOfLastEvent = currentPage * contactsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - contactsPerPage;

    const currentContacts = contacts.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(contacts.length / contactsPerPage);

    return (
        <div className="contact-management">
            <h2>Quản lý Góp Ý</h2>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Tên người gửi</th>
                        <th>Email</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentContacts.map((content) => (
                        <tr key={content.id}>
                            <td>{content.id}</td>
                            <td>{content.title}</td>
                            <td>{content.content}</td>
                            <td>{content.sender_name}</td>
                            <td>{content.email_sender}</td>
                            <td>
                                <button
                                    onClick={() => openViewModal(content)}
                                    className="btn btn-info mr-2"
                                >
                                    Xem
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

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Xem Nội dung</h3>
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input
                                type="text"
                                className="form-control"
                                value={currentContent.title}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Nội dung</label>
                            <textarea
                                className="form-control"
                                value={currentContent.content}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Tên người gửi</label>
                            <input
                                type="text"
                                className="form-control"
                                value={currentContent.sender_name}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={currentContent.email_sender}
                                readOnly
                            />
                        </div>
                        <button
                            onClick={closeModal}
                            className="btn btn-danger"
                            style={{ marginLeft: '10px' }}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContantManagement;
