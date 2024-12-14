import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostManagement.css';

function PostManagement() {
    const [posts, setPosts] = useState([]); // danh sách bài viết
    const navigate = useNavigate(); // tạo useNavigate để điều hướng đến route khác
    const isMaster = JSON.parse(localStorage.getItem('is_master')) || true;

    // Gọi API khi component được render
    useEffect(() => {
        // Hàm để gọi API và lấy bài viết
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8000/api/Post/data', // API endpoint mới
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token',
                            )}`, // Lấy token từ localStorage
                        },
                    },
                );
                // Kiểm tra xem dữ liệu API có hợp lệ không
                if (response.data && response.data.posts) {
                    setPosts(response.data.posts); // Lưu dữ liệu bài viết vào state
                } else {
                    console.error('API returned invalid data');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts(); // Gọi API
    }, []); // useEffect chỉ chạy 1 lần khi component render lần đầu

    // Điều hướng đến form thêm bài viết mới
    const handleAddNew = () => {
        navigate('/dashboardadmin/post/add'); // Điều hướng đến form thêm bài viết mới
    };

    // Điều hướng đến form chỉnh sửa bài viết
    const handleEdit = (postId) => {
        navigate(`/dashboardadmin/post/edit/${postId}`); // Điều hướng đến form chỉnh sửa bài viết
    };

    // Thêm hàm xử lý xóa bài viết
    const handleDelete = async (postId) => {
        if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
            try {
                await axios.delete(
                    `http://127.0.0.1:8000/api/Post/delete${postId}`, // API endpoint xóa bài viết
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token',
                            )}`, // Lấy token từ localStorage
                        },
                    },
                );
                // Xóa bài viết khỏi danh sách hiện tại
                setPosts(posts.filter((post) => post.id !== postId));
                alert('Xóa bài viết thành công');
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Xóa bài viết thất bại. Vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="post-management">
            <h2 className="post-management-title">Quản lý Bài Viết</h2>

            {/* Nút thêm bài viết chỉ hiển thị nếu is_master === true */}
            {isMaster && (
                <button
                    className="btn btn-success mb-3"
                    style={{ float: 'right' }}
                    onClick={handleAddNew}
                >
                    Thêm Bài Mới
                </button>
            )}

            {/* Bảng quản lý bài viết */}
            <table className="post-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Hội viên</th>
                        <th>Danh mục</th>
                        <th>Trạng thái</th>
                        <th>Hình ảnh</th> {/* Thêm cột hình ảnh */}
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length === 0 ? (
                        <tr>
                            <td colSpan="8">Không có bài viết nào</td>
                        </tr>
                    ) : (
                        posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td className="title-column">{post.title}</td>
                                <td>{post.content.slice(0, 30)}...</td>
                                <td>
                                    {post.member
                                        ? post.member.full_name
                                        : 'không xác định'}
                                </td>{' '}
                                <td>{post.category.category_name}</td>{' '}
                                {/* Cột danh mục */}
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
                                        onClick={() => handleEdit(post.id)} // Thêm sự kiện click vào nút chỉnh sửa
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
        </div>
    );
}

export default PostManagement;
