import React, { useState } from 'react';
import './AssociationManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AssociationManagement() {
    const [associations, setAssociations] = useState([
        {
            id: 1,
            username: 'assoc123',
            password: '********',
            email: 'assoc123@example.com',
            phone: '0123456789',
            address: '123 Main St, City',
            companyName: 'Company A',
            website: 'https://companya.com',
            isMaster: false,
            isOpen: true,
        },
        {
            id: 2,
            username: 'admin123',
            password: '********',
            email: 'admin123@example.com',
            phone: '0987654321',
            address: '456 Elm St, City',
            companyName: 'Admin Organization',
            website: 'https://admin.org',
            isMaster: true,
            isOpen: true,
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentAssociation, setCurrentAssociation] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        companyName: '',
        website: '',
        isMaster: false,
        isOpen: true,
    });

    const openEditModal = (association) => {
        setCurrentAssociation(association);
        setFormData({
            username: association.username,
            email: association.email,
            phone: association.phone,
            address: association.address,
            companyName: association.companyName,
            website: association.website,
            isMaster: association.isMaster,
            isOpen: association.isOpen,
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentAssociation(null);
        setFormData({
            username: '',
            email: '',
            phone: '',
            address: '',
            companyName: '',
            website: '',
            isMaster: false,
            isOpen: true,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentAssociation(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'isMaster' || name === 'isOpen') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value === 'true',
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleUpdateAssociation = () => {
        setAssociations(
            associations.map((association) =>
                association.id === currentAssociation.id
                    ? { ...association, ...formData }
                    : association,
            ),
        );
        closeModal();
    };

    const handleAddAssociation = () => {
        const newAssociation = {
            id: associations.length + 1,
            ...formData,
        };
        setAssociations([...associations, newAssociation]);
        closeModal();
    };

    const handleDeleteAssociation = (id) => {
        const newAssociations = associations.filter(
            (association) => association.id !== id,
        );
        setAssociations(newAssociations);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const associationsPerPage = 6;
    const indexOfLastAssociation = currentPage * associationsPerPage;
    const indexOfFirstAssociation =
        indexOfLastAssociation - associationsPerPage;
    const currentAssociations = associations.slice(
        indexOfFirstAssociation,
        indexOfLastAssociation,
    );
    const totalPages = Math.ceil(associations.length / associationsPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="association-management">
            <h2 className="title-association">Quản lý Hiệp hội</h2>
            <button
                onClick={openAddModal}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Add New
            </button>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Tên công ty</th>
                        <th>Is Master</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAssociations.map((association) => (
                        <tr key={association.id}>
                            <td>{association.id}</td>
                            <td>{association.username}</td>
                            <td>{association.password}</td>
                            <td>{association.email}</td>
                            <td>{association.companyName}</td>
                            <td>{association.isMaster ? 'Yes' : 'No'}</td>
                            <td>{association.isOpen ? 'Mở' : 'Khóa'}</td>
                            <td>
                                <button
                                    onClick={() => openEditModal(association)}
                                    className="btn btn-warning mr-2"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteAssociation(association.id)
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

            {/* Pagination */}
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
                            onClick={() => handlePageChange(currentPage - 1)}
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
                                onClick={() => handlePageChange(index + 1)}
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
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Modal chỉnh sửa */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>
                            {currentAssociation
                                ? 'Chỉnh sửa Hiệp hội'
                                : 'Thêm mới Hiệp hội'}
                        </h3>
                        <div className="form-group">
                            <label>Tên người dùng</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tên công ty</label>
                            <input
                                type="text"
                                className="form-control"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Is Master</label>
                            <select
                                className="form-control"
                                name="isMaster"
                                value={formData.isMaster}
                                onChange={handleInputChange}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                className="form-control"
                                name="isOpen"
                                value={formData.isOpen}
                                onChange={handleInputChange}
                            >
                                <option value={true}>Mở</option>
                                <option value={false}>Khóa</option>
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button
                                onClick={
                                    currentAssociation
                                        ? handleUpdateAssociation
                                        : handleAddAssociation
                                }
                                className="btn btn-primary"
                            >
                                {currentAssociation ? 'Cập nhật' : 'Thêm mới'}
                            </button>
                            <button
                                onClick={closeModal}
                                className="btn btn-secondary"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssociationManagement;
