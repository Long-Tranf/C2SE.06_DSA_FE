import { useState, useEffect } from 'react';
import Breadcrumb from '~/components/Layout/components/Breadcrumb/Breadcumb';
import './ContentCategoryDetail.css';

function ContentCategoryDetail() {
    const categoryName = 'Library'; // Giả sử tên danh mục hiện tại
    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'Category', link: '/category' },
        { name: categoryName, active: true },
    ];

    // Giả sử API trả về danh sách bài viết
    const allPosts = [
        {
            id: 1,
            title: 'Bài viết 1',
            content: 'Nội dung bài viết 1... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            title: 'Bài viết 2',
            content: 'Nội dung bài viết 2... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            title: 'Bài viết 3',
            content: 'Nội dung bài viết 3... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 4,
            title: 'Bài viết 4',
            content: 'Nội dung bài viết 4... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 5,
            title: 'Bài viết 5',
            content: 'Nội dung bài viết 5... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 6,
            title: 'Bài viết 6',
            content: 'Nội dung bài viết 6... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 7,
            title: 'Bài viết 7',
            content: 'Nội dung bài viết 7... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 8,
            title: 'Bài viết 8',
            content: 'Nội dung bài viết 8... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 9,
            title: 'Bài viết 9',
            content: 'Nội dung bài viết 9... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 10,
            title: 'Bài viết 10',
            content: 'Nội dung bài viết 10... Đây là một bài viết dài',
            image: 'https://via.placeholder.com/150',
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    // Logic để phân trang
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    // Hàm để giới hạn nội dung bài viết
    const limitContent = (content, length = 100) => {
        return content.length > length
            ? content.substring(0, length) + '...'
            : content;
    };

    return (
        <div className="wrapper-category">
            <h3 className="title-category">{categoryName}</h3>

            {/* Breadcrumb nằm ở trên cùng của trang */}
            <div className="breadcrumb-container">
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="d-flex">
                {/* Sidebar */}
                <div className="sidebar" style={{ width: '250px' }}>
                    <h3 className="category-heading">Giới thiệu</h3>
                    <ul className="list-unstyled category-list">
                        <li className="list-item">
                            <a href="#">Link 1</a>
                        </li>
                        <li className="list-item">
                            <a href="#">Link 2</a>
                        </li>
                        <li className="list-item">
                            <a href="#">Link 3</a>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main-content p-4" style={{ flexGrow: 1 }}>
                    <h1>Main Content Area</h1>
                    <div className="posts-list">
                        {currentPosts.map((post) => (
                            <div
                                key={post.id}
                                className="post-item d-flex mb-4"
                            >
                                <div
                                    className="post-image"
                                    style={{
                                        width: '150px',
                                        marginRight: '20px',
                                    }}
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="post-details">
                                    <h5>{post.title}</h5>
                                    <p>{limitContent(post.content, 100)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination sẽ được di chuyển xuống dưới content */}
            <div className="pagination-wrapper">
                <nav aria-label="...">
                    <ul className="pagination justify-content-center">
                        <li
                            className="page-item"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <a className="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${
                                    currentPage === index + 1 ? 'active' : ''
                                }`}
                            >
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li
                            className="page-item"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <a className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default ContentCategoryDetail;
