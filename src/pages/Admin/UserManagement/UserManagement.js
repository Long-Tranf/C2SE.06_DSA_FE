import React, { useState } from 'react';
import './UserManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserManagement() {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'user123',
            password: '********',
            email: 'user123@example.com',
            phone: '0123456789',
            address: '123 Main St, City',
            isOpen: true,
        },
        {
            id: 2,
            username: 'admin123',
            password: '********',
            email: 'admin123@example.com',
            phone: '0987654321',
            address: '456 Elm St, City',
            isOpen: false,
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        isOpen: true,
    });

    const openEditModal = (user) => {
        setCurrentUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isOpen: user.isOpen,
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentUser(null); // Đảm bảo không có user nào được chọn
        setFormData({
            username: '',
            email: '',
            phone: '',
            address: '',
            isOpen: true,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentUser(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'isOpen') {
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

    const handleUpdateUser = () => {
        setUsers(
            users.map((user) =>
                user.id === currentUser.id ? { ...user, ...formData } : user,
            ),
        );
        closeModal();
    };

    const handleAddUser = () => {
        const newUser = {
            id: users.length + 1,
            ...formData,
        };
        setUsers([...users, newUser]);
        closeModal();
    };

    const handleDeleteUser = (id) => {
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;
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
            <h2>Quản lý User</h2>
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
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.isOpen ? 'Mở' : 'Khóa'}</td>
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
                                name="username"
                                value={formData.username}
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
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
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
                            <label>Trạng thái</label>
                            <select
                                className="form-control"
                                name="isOpen"
                                value={formData.isOpen.toString()}
                                onChange={handleInputChange}
                            >
                                <option value={true}>Mở</option>
                                <option value={false}>Khóa</option>
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
