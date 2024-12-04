import React, { useState } from 'react';
import './PostManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostManagement() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Post 1',
            content: 'Content of Post 1',
            author: 'User 1',
            category: 'Category 1',
            isOpen: true,
        },
        {
            id: 2,
            title: 'Post 2',
            content: 'Content of Post 2',
            author: 'User 2',
            category: 'Category 2',
            isOpen: false,
        },
        {
            id: 3,
            title: 'Post 3',
            content: 'Content of Post 3',
            author: 'User 1',
            category: 'Category 3',
            isOpen: true,
        },
        {
            id: 4,
            title: 'Post 4',
            content: 'Content of Post 4',
            author: 'User 2',
            category: 'Category 4',
            isOpen: false,
        },
        {
            id: 5,
            title: 'Post 5',
            content: 'Content of Post 5',
            author: 'User 3',
            category: 'Category 1',
            isOpen: true,
        },
        {
            id: 6,
            title: 'Post 6',
            content: 'Content of Post 6',
            author: 'User 1',
            category: 'Category 2',
            isOpen: false,
        },
        {
            id: 7,
            title: 'Post 7',
            content: 'Content of Post 7',
            author: 'User 3',
            category: 'Category 3',
            isOpen: true,
        },
        {
            id: 8,
            title: 'Post 8',
            content: 'Content of Post 8',
            author: 'User 2',
            category: 'Category 4',
            isOpen: false,
        },
        {
            id: 9,
            title: 'Post 9',
            content: 'Content of Post 9',
            author: 'User 1',
            category: 'Category 1',
            isOpen: true,
        },
        {
            id: 10,
            title: 'Post 10',
            content: 'Content of Post 10',
            author: 'User 2',
            category: 'Category 2',
            isOpen: false,
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5; // Số bài viết trên mỗi trang
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="post-management">
            <h2>Quản lý Bài Viết</h2>
            <table className="post-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Hội viên</th>
                        <th>Danh mục</th>
                        <th>Nội dung</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.category}</td>
                            <td>{post.content.slice(0, 30)}...</td>
                            <td>{post.isOpen ? 'Mở' : 'Khóa'}</td>
                            <td>
                                <button className="btn btn-warning mr-2">
                                    Chỉnh sửa
                                </button>
                                <button className="btn btn-danger">Xóa</button>
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
                            currentPage === 1 ? 'disabled' : ''
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
                            currentPage === totalPages ? 'disabled' : ''
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
        </div>
    );
}

export default PostManagement;
