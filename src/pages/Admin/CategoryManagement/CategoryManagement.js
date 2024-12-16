import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        parentId: null,
        isOpen: true,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 6;

    useEffect(() => {
        fetchCategories();
    }, []);

    // Lấy danh sách danh mục
    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/Categories/data',
            );
            const apiCategories = response.data.categories.map((cat) => ({
                id: cat.id,
                name: cat.category_name,
                parentId:
                    cat.parent_category_id === 0
                        ? null
                        : cat.parent_category_id,
                isOpen: cat.is_open === 1,
            }));
            setCategories(apiCategories);
        } catch (error) {
            console.error('Lỗi khi tải danh mục:', error);
            alert('Không thể tải danh mục. Vui lòng thử lại sau!');
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = (category = null) => {
        setCurrentCategory(category);
        setFormData({
            name: category?.name || '',
            parentId: category?.parentId || '',
            isOpen: category?.isOpen || true,
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

    const handleSaveCategory = async () => {
        setIsLoading(true);
        try {
            if (currentCategory) {
                await axios.put(`http://127.0.0.1:8000/api/Categories/update`, {
                    id: currentCategory.id,
                    category_name: formData.name,
                    parent_category_id: formData.parentId || 0,
                    is_open: formData.isOpen ? 1 : 0,
                });
            } else {
                // Add new category
                await axios.post(
                    'http://127.0.0.1:8000/api/Categories/create',
                    {
                        category_name: formData.name,
                        parent_category_id: formData.parentId || 0,
                        is_open: formData.isOpen ? 1 : 0,
                    },
                );
            }
            fetchCategories();
            closeModal();
        } catch (error) {
            console.error(
                `Lỗi khi ${currentCategory ? 'cập nhật' : 'thêm'} danh mục:`,
                error,
            );
            alert(
                `Không thể ${
                    currentCategory ? 'cập nhật' : 'thêm'
                } danh mục. Vui lòng thử lại!`,
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;

        setIsLoading(true);
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/Categories/delete${id}`,
            );
            fetchCategories();
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error);
            alert('Không thể xóa danh mục. Vui lòng thử lại!');
        } finally {
            setIsLoading(false);
        }
    };

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(
        indexOfFirstCategory,
        indexOfLastCategory,
    );
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const getParentName = (parentId) => {
        const parent = categories.find((cat) => cat.id === parentId);
        return parent ? parent.name : 'N/A';
    };

    return (
        <div className="category-management">
            <h2 className="category-management-title">Quản lý Danh mục</h2>
            <button
                onClick={() => openModal()}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Thêm mới
            </button>

            {isLoading ? (
                <div className="loading">Đang tải...</div>
            ) : (
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
                                        onClick={() => openModal(category)}
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
            )}

            {/* Pagination */}
            <nav className="d-flex justify-content-center mt-3">
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
                                        (cat) =>
                                            cat.parentId === null ||
                                            cat.parentId === 0,
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
                                <option value="true">Mở</option>
                                <option value="false">Khóa</option>
                            </select>
                        </div>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={handleSaveCategory}
                            disabled={isLoading}
                        >
                            Lưu
                        </button>
                        <button
                            className="btn btn-secondary mt-3 ml-2"
                            onClick={closeModal}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryManagement;
