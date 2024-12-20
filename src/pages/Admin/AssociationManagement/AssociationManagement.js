import React, { useState, useEffect } from 'react';
import './AssociationManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AssociationManagement() {
    const [associations, setAssociations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAssociation, setCurrentAssociation] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        user_name: '',
        password: '',
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
            password: association.password,
            company_email: association.company_email,
            registrant_name: association.registrant_name,
            subscriber_email: association.subscriber_email,
            phone_number: association.phone_number,
            registered_phone_number: association.registered_phone_number,
            address: association.address,
            website: association.website,
            avatar: association.avatar,
            is_active: association.is_active,
            is_open: Number(association.is_open),
            company_name: association.company_name,
            is_master: association.is_master,
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentAssociation(null);
        setFormData({
            user_name: '',
            password: '',
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prevState) => ({
                ...prevState,
                avatar: imageUrl,
            }));
        }
    };

    const handleUpdateAssociation = () => {
        axios
            .put(`http://127.0.0.1:8000/api/associations/update`, {
                id: currentAssociation.id,
                ...formData,
            })
            .then(() => {
                setAssociations(
                    associations.map((association) =>
                        association.id === currentAssociation.id
                            ? { ...association, ...formData }
                            : association,
                    ),
                );
                closeModal();
            })
            .catch((error) => {
                console.error('Error updating association:', error);
            });
    };

    const handleAddAssociation = () => {
        axios
            .post('http://127.0.0.1:8000/api/Association/create', formData)
            .then((response) => {
                setAssociations([...associations, response.data]);
                closeModal();
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi lưu bài viết:', error);
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                    console.log(errors);
                } else {
                    alert('Không thể lưu bài viết. Vui lòng thử lại!');
                }
            });
    };

    const handleDeleteAssociation = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/Association/delete${id}`)
            .then(() => {
                setAssociations(
                    associations.filter((association) => association.id !== id),
                );
            })
            .catch((error) => {
                console.error('Error deleting association:', error);
                alert('Không thể xóa hiệp hội. Vui lòng thử lại!');
            });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 4;

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
                            {errors.user_name && (
                                <p className="error-message">
                                    {errors.user_name[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Mật Khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && (
                                <p className="error-message">
                                    {errors.password[0]}
                                </p>
                            )}
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
                            {errors.company_email && (
                                <p className="error-message">
                                    {errors.company_email[0]}
                                </p>
                            )}
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
                            {errors.registrant_name && (
                                <p className="error-message">
                                    {errors.registrant_name[0]}
                                </p>
                            )}
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
                            {errors.subscriber_email && (
                                <p className="error-message">
                                    {errors.subscriber_email[0]}
                                </p>
                            )}
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
                            {errors.phone_number && (
                                <p className="error-message">
                                    {errors.phone_number[0]}
                                </p>
                            )}
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
                            {errors.registered_phone_number && (
                                <p className="error-message">
                                    {errors.registered_phone_number[0]}
                                </p>
                            )}
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
                            {errors.address && (
                                <p className="error-message">
                                    {errors.address[0]}
                                </p>
                            )}
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
                            {errors.website && (
                                <p className="error-message">
                                    {errors.website[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Avatar</label>
                            <input
                                type="url"
                                className="form-control"
                                name="avatar"
                                placeholder="Nhập URL avatar"
                                value={formData.avatar}
                                onChange={handleInputChange}
                            />
                            <input
                                type="file"
                                className="form-control mt-2"
                                onChange={handleFileChange}
                            />
                            {errors.avatar && (
                                <p className="error-message">
                                    {errors.avatar[0]}
                                </p>
                            )}
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
                            {errors.company_name && (
                                <p className="error-message">
                                    {errors.company_name[0]}
                                </p>
                            )}
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
