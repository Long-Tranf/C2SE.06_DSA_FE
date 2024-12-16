import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostManagement.css';

function PostManagement() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    var isMaster = JSON.parse(localStorage.getItem('isMaster'));

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8000/api/Post/data',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token',
                            )}`,
                        },
                    },
                );
                if (response.data && response.data.posts) {
                    setPosts(response.data.posts);
                } else {
                    console.error('API returned invalid data');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleAddNew = () => {
        navigate('/dashboardadmin/post/add');
    };

    const handleEdit = (postId) => {
        navigate(`/dashboardadmin/post/edit/${postId}`);
    };

    const handleDelete = async (postId) => {
        if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
            try {
                await axios.delete(
                    `http://127.0.0.1:8000/api/Post/delete${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token',
                            )}`,
                        },
                    },
                );
                setPosts(posts.filter((post) => post.id !== postId));
                alert('Xóa bài viết thành công');
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Xóa bài viết thất bại. Vui lòng thử lại.');
            }
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

    const currentPosts = posts.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(posts.length / eventsPerPage);

    return (
        <div className="post-management">
            <h2 className="post-management-title">Quản lý Bài Viết</h2>

            {isMaster === 1 && (
                <button
                    className="btn btn-success mb-3"
                    style={{ float: 'right' }}
                    onClick={handleAddNew}
                >
                    Thêm Bài Mới
                </button>
            )}

            <table className="post-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Hội viên</th>
                        <th>Danh mục</th>
                        <th>Trạng thái</th>
                        <th>Hình ảnh</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.length === 0 ? (
                        <tr>
                            <td colSpan="8">Không có bài viết nào</td>
                        </tr>
                    ) : (
                        currentPosts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td className="title-column">{post.title}</td>
                                <td>{post.content.slice(0, 30)}...</td>
                                <td>
                                    {post.association
                                        ? post.association.registrant_name
                                        : 'không xác định'}
                                </td>{' '}
                                <td>{post.category.category_name}</td>{' '}
                                <td>
                                    <span
                                        className={`status-btn ${
                                            post.is_open === 1
                                                ? 'open'
                                                : 'close'
                                        }`}
                                    >
                                        {post.is_open === 1
                                            ? 'Active'
                                            : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    {post.image && (
                                        <img
                                            src={post.image}
                                            alt="Post"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                            }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEdit(post.id)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
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
        </div>
    );
}

export default PostManagement;
