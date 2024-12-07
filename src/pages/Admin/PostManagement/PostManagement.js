import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook để điều hướng
import axios from 'axios'; // Import axios để gọi API
import './PostManagement.css';

function PostManagement() {
    const [posts, setPosts] = useState([]); // Danh sách bài viết (ban đầu là mảng rỗng)
    const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng đến route khác
    const isMaster = JSON.parse(localStorage.getItem('is_master')) || false; // Kiểm tra quyền admin từ localStorage

    // Gọi API khi component được render
    useEffect(() => {
        // Hàm để gọi API và lấy bài viết
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/posts',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token',
                            )}`, // Lấy token từ localStorage
                        },
                    },
                );
                // Kiểm tra xem dữ liệu API có hợp lệ không
                if (response.data && Array.isArray(response.data)) {
                    setPosts(response.data); // Lưu dữ liệu bài viết vào state
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

    return (
        <div className="post-management">
            <h2>Quản lý Bài Viết</h2>

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
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length === 0 ? (
                        <tr>
                            <td colSpan="7">Không có bài viết nào</td>
                        </tr>
                    ) : (
                        posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.content.slice(0, 30)}...</td>
                                <td>{post.author}</td>
                                <td>{post.category}</td>
                                <td>
                                    <span
                                        className={`status-btn ${
                                            post.status === 'Active'
                                                ? 'open'
                                                : 'close'
                                        }`}
                                    >
                                        {post.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEdit(post.id)} // Thêm sự kiện click vào nút chỉnh sửa
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button className="btn btn-danger">
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
