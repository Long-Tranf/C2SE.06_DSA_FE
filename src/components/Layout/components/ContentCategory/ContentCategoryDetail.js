import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Layout/components/Breadcrumb/Breadcumb'; // Sửa lỗi chính tả
import './ContentCategoryDetail.css';

function ContentCategoryDetail() {
    const { categoryId } = useParams(); // Lấy categoryId từ URL
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryName, setParentCategoryName] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: parentCategoryName, link: `/category/${categoryId}` },
        { name: categoryName, active: true },
    ];

    const [posts, setPosts] = useState([]); // Bài viết
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    useEffect(() => {
        // Fetch category thông tin
        const fetchCategory = async () => {
            const categoryResponse = await fetch(
                `http://127.0.0.1:8000/api/categories/${categoryId}`,
            );
            const categoryData = await categoryResponse.json();
            setCategoryName(categoryData.category.category_name);
            const parentCategoryId = categoryData.category.parent_category_id;

            if (parentCategoryId !== 0) {
                const parentCategoryResponse = await fetch(
                    `http://127.0.0.1:8000/api/categories/${parentCategoryId}`,
                );
                const parentCategoryData = await parentCategoryResponse.json();
                setParentCategoryName(
                    parentCategoryData.category.category_name,
                );
            }

            const subCategoryResponse = await fetch(
                `http://127.0.0.1:8000/api/categories/children/${parentCategoryId}`,
            );
            const subCategoryData = await subCategoryResponse.json();
            setSubCategories(subCategoryData.child_categories);
        };

        // Fetch bài viết cho categoryId
        const fetchPosts = async () => {
            const response = await fetch(
                `http://127.0.0.1:8000/api/categories/${categoryId}/posts`,
            );
            const data = await response.json();
            setPosts(data);
        };

        fetchCategory();
        fetchPosts();
    }, [categoryId]); // Dependency array là categoryId để fetch lại khi categoryId thay đổi

    const removeImagesFromContent = (content) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const images = tempDiv.querySelectorAll('img');
        images.forEach((img) => img.remove()); // Loại bỏ ảnh
        return tempDiv.innerHTML; // Trả ra HTML không có ảnh
    };

    const truncateText = (text, length = 100) => {
        if (text.length > length) {
            return text.substring(0, length) + '...'; // Cắt văn bản và thêm "..."
        }
        return text;
    };

    return (
        <div className="wrapper-category">
            <h3 className="title-category">{categoryName}</h3>

            <div className="breadcrumb-container">
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="d-flex">
                <div className="sidebar-category" style={{ width: '250px' }}>
                    <h3 className="category-heading">{parentCategoryName}</h3>
                    <ul className="list-unstyled category-list">
                        {subCategories.length > 0 ? (
                            subCategories.map((subCategory) => (
                                <li key={subCategory.id} className="list-item">
                                    <a href={`/category/${subCategory.id}`}>
                                        {subCategory.category_name}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li className="list-item">Không có danh mục con</li>
                        )}
                    </ul>
                </div>

                <div className="main-content">
                    <div className="posts-list">
                        {currentPosts.map(
                            (post) =>
                                post.is_open === 1 && ( // Kiểm tra điều kiện is_open
                                    <div
                                        key={post.id}
                                        className="post-item d-flex"
                                    >
                                        <div className="post-image">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="post-details">
                                            <h5 className="category-post-title">
                                                {post.title}
                                            </h5>
                                            <p
                                                className="category-post-content"
                                                dangerouslySetInnerHTML={{
                                                    __html: removeImagesFromContent(
                                                        truncateText(
                                                            post.content,
                                                            350,
                                                        ),
                                                    ),
                                                }}
                                            ></p>
                                        </div>
                                    </div>
                                ),
                        )}
                    </div>
                </div>
            </div>

            <div className="pagination-wrapper">
                <nav aria-label="...">
                    <ul className="pagination justify-content-center">
                        <li
                            className={`page-item ${
                                currentPage === 1 ? 'disabled' : ''
                            }`} // Disable Previous if on the first page
                        >
                            <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) {
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}
                            >
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
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li
                            className={`page-item ${
                                currentPage === totalPages || totalPages === 0
                                    ? 'disabled'
                                    : ''
                            }`} // Disable Next if on the last page
                        >
                            <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) {
                                        setCurrentPage(currentPage + 1);
                                    }
                                }}
                            >
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
