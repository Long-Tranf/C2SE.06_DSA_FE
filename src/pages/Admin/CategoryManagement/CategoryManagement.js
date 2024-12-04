import React, { useState } from 'react';
import './CategoryManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryManagement() {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Electronics', parentId: null, isOpen: true },
        { id: 2, name: 'Laptops', parentId: 1, isOpen: true },
        { id: 3, name: 'Smartphones', parentId: 1, isOpen: true },
        { id: 4, name: 'Furniture', parentId: null, isOpen: false },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        parentId: null,
        isOpen: true,
    });

    const openEditModal = (category) => {
        setCurrentCategory(category);
        setFormData({
            name: category.name,
            parentId: category.parentId === null ? '' : category.parentId,
            isOpen: category.isOpen,
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentCategory(null);
        setFormData({
            name: '',
            parentId: '',
            isOpen: true,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentCategory(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]:
                name === 'isOpen'
                    ? value === 'true'
                    : name === 'parentId'
                    ? value === ''
                        ? null
                        : parseInt(value, 10)
                    : value,
        }));
    };

    const handleUpdateCategory = () => {
        setCategories(
            categories.map((category) =>
                category.id === currentCategory.id
                    ? { ...category, ...formData }
                    : category,
            ),
        );
        closeModal();
    };

    const handleAddCategory = () => {
        const newCategory = {
            id: categories.length + 1,
            ...formData,
        };
        setCategories([...categories, newCategory]);
        closeModal();
    };

    const handleDeleteCategory = (id) => {
        const updatedCategories = categories.filter(
            (category) => category.id !== id && category.parentId !== id,
        );
        setCategories(updatedCategories);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 6;
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(
        indexOfFirstCategory,
        indexOfLastCategory,
    );
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const getParentName = (parentId) => {
        const parent = categories.find((cat) => cat.id === parentId);
        return parent ? parent.name : 'N/A';
    };

    return (
        <div className="user-management">
            <h2>Quản lý Danh mục</h2>
            <button
                onClick={openAddModal}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Thêm mới
            </button>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th>Danh mục cha</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCategories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{getParentName(category.parentId)}</td>
                            <td>{category.isOpen ? 'Mở' : 'Khóa'}</td>
                            <td>
                                <button
                                    onClick={() => openEditModal(category)}
                                    className="btn btn-warning mr-2"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteCategory(category.id)
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

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>
                            {currentCategory
                                ? 'Chỉnh sửa Danh mục'
                                : 'Thêm mới Danh mục'}
                        </h3>
                        <div className="form-group">
                            <label>Tên danh mục</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Danh mục cha</label>
                            <select
                                className="form-control"
                                name="parentId"
                                value={formData.parentId || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">Không có</option>
                                {categories
                                    .filter(
                                        (cat) => cat.id !== currentCategory?.id,
                                    )
                                    .map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                            </select>
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
                                currentCategory
                                    ? handleUpdateCategory
                                    : handleAddCategory
                            }
                            className="btn btn-primary"
                        >
                            {currentCategory ? 'Cập nhật' : 'Thêm mới'}
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

export default CategoryManagement;
