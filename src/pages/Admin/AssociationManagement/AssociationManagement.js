import React, { useState, useEffect } from 'react';
import './AssociationManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AssociationManagement() {
    const [associations, setAssociations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAssociation, setCurrentAssociation] = useState(null);
    const [formData, setFormData] = useState({
        user_name: '',
        company_email: '',
        registrant_name: '',
        subscriber_email: '',
        phone_number: '',
        registered_phone_number: '',
        address: '',
        website: '',
        avatar: '',
        is_active: 1,
        is_open: 1,
        company_name: '',
        is_master: 0,
    });

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios
            .get('http://127.0.0.1:8000/api/Association/data')
            .then((response) => {
                setAssociations(response.data.members);
            })
            .catch((error) => {
                console.error('Error fetching associations:', error);
            });
    }, []);

    const openEditModal = (association) => {
        setCurrentAssociation(association);
        setFormData({
            user_name: association.user_name,
            company_email: association.company_email,
            registrant_name: association.registrant_name,
            subscriber_email: association.subscriber_email,
            phone_number: association.phone_number,
            registered_phone_number: association.registered_phone_number,
            address: association.address,
            website: association.website,
            avatar: association.avatar,
            is_active: association.is_active,
            is_open: association.is_open,
            company_name: association.company_name,
            is_master: association.is_master,
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentAssociation(null);
        setFormData({
            user_name: '',
            company_email: '',
            registrant_name: '',
            subscriber_email: '',
            phone_number: '',
            registered_phone_number: '',
            address: '',
            website: '',
            avatar: '',
            is_active: 1,
            is_open: 1,
            company_name: '',
            is_master: 0,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentAssociation(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
    const eventsPerPage = 5;

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

    const currentAssociations = associations.slice(
        indexOfFirstEvent,
        indexOfLastEvent,
    );

    const totalPages = Math.ceil(associations.length / eventsPerPage);

    return (
        <div className="association-management">
            <h2 className="title-association">Quản lý Hiệp hội</h2>
            <button
                onClick={openAddModal}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Thêm Mới Hiệp Hội
            </button>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Registrant Name</th>
                        <th>Email</th>
                        <th>Tên công ty</th>
                        <th>Avatar</th>
                        <th>Is Master</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAssociations.map((association) => (
                        <tr key={association.id}>
                            <td>{association.id}</td>
                            <td>{association.registrant_name}</td>{' '}
                            <td>{association.company_email}</td>{' '}
                            <td>{association.company_name}</td>{' '}
                            <td>
                                <img
                                    src={association.avatar}
                                    alt={association.registrant_name}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                    }}
                                />{' '}
                            </td>
                            <td>{association.is_master ? 'Yes' : 'No'}</td>
                            <td>{association.is_open ? 'Mở' : 'Khóa'}</td>
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
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email công ty</label>
                            <input
                                type="email"
                                className="form-control"
                                name="company_email"
                                value={formData.company_email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tên người đăng ký</label>
                            <input
                                type="text"
                                className="form-control"
                                name="registrant_name"
                                value={formData.registrant_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email người đăng ký</label>
                            <input
                                type="email"
                                className="form-control"
                                name="subscriber_email"
                                value={formData.subscriber_email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại đăng ký</label>
                            <input
                                type="text"
                                className="form-control"
                                name="registered_phone_number"
                                value={formData.registered_phone_number}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Website</label>
                            <input
                                type="url"
                                className="form-control"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Avatar</label>
                            <input
                                type="url"
                                className="form-control"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Is Active</label>
                            <select
                                className="form-control"
                                name="is_active"
                                value={formData.is_active}
                                onChange={handleInputChange}
                            >
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Is Open</label>
                            <select
                                className="form-control"
                                name="is_open"
                                value={formData.is_open}
                                onChange={handleInputChange}
                            >
                                <option value={1}>Open</option>
                                <option value={0}>Closed</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Công ty</label>
                            <input
                                type="text"
                                className="form-control"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Is Master</label>
                            <select
                                className="form-control"
                                name="is_master"
                                value={formData.is_master}
                                onChange={handleInputChange}
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
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
