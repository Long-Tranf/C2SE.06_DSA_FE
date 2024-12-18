import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        user_name: '',
        password: '',
        full_name: '',
        subscriber_email: '',
        phone_number: '',
        address: '',
        avatar: '',
        is_open: 1,
    });

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/member/data')
            .then((response) => {
                setUsers(response.data.members);
            })
            .catch((error) => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const openEditModal = (user) => {
        setCurrentUser(user);
        setFormData({
            user_name: user.user_name,
            password: user.password,
            full_name: user.full_name,
            subscriber_email: user.subscriber_email,
            phone_number: user.phone_number,
            address: user.address,
            avatar: user.avatar,
            is_open: user.is_open,
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentUser(null);
        setFormData({
            user_name: '',
            password: '',
            full_name: '',
            subscriber_email: '',
            phone_number: '',
            address: '',
            avatar: '',
            is_open: 1,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentUser(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'is_open') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value === '1' ? 1 : 0,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
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

    const handleUpdateUser = () => {
        axios
            .put('http://127.0.0.1:8000/api/member/update', {
                id: currentUser.id,
                ...formData,
            })
            .then(() => {
                setUsers(
                    users.map((user) =>
                        user.id === currentUser.id
                            ? { ...user, ...formData }
                            : user,
                    ),
                );
                closeModal();
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/member/create',
                formData,
            );
            setUsers([...users, response.data]);
            closeModal();
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm người dùng:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
                console.log(errors);
            } else {
                alert('Không thể thêm người dùng. Vui lòng thử lại!');
            }
        }
    };

    const handleDeleteUser = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/member/delete${id}`)
            .then(() => {
                setUsers(users.filter((user) => user.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="user-management">
            <h2 className="user-management-title">Quản lý Member</h2>
            <button
                onClick={openAddModal}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Thêm Mới Member
            </button>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Avatar</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.user_name}</td>
                            <td>{user.full_name}</td>
                            <td>{user.subscriber_email}</td>
                            <td>{user.phone_number}</td>
                            <td>{user.address}</td>
                            <td>
                                <img
                                    src={user.avatar}
                                    alt="avatar"
                                    width="50"
                                    height="50"
                                />
                            </td>
                            <td>{user.is_open ? 'Mở' : 'Khóa'}</td>
                            <td>
                                <button
                                    onClick={() => openEditModal(user)}
                                    className="btn btn-warning mr-2"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
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
                            {currentUser ? 'Chỉnh sửa User' : 'Thêm mới User'}
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
                                type="text"
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
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleInputChange}
                            />
                            {errors.full_name && (
                                <p className="error-message">
                                    {errors.full_name[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Email</label>
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
                            <label>Avatar</label>
                            <input
                                type="file"
                                className="form-control"
                                name="avatar"
                                onChange={handleFileChange}
                            />
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
                        <button
                            onClick={
                                currentUser ? handleUpdateUser : handleAddUser
                            }
                            className="btn btn-primary"
                        >
                            {currentUser ? 'Cập nhật' : 'Thêm mới'}
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

export default UserManagement;
