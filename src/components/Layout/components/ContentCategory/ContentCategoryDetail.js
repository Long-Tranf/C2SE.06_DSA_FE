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

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const limitContent = (content, length = 100) => {
        return content.length > length
            ? content.substring(0, length) + '...'
            : content;
    };

    useEffect(() => {
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

        const fetchPosts = async () => {
            const response = await fetch(
                `http://127.0.0.1:8000/api/categories/${categoryId}/posts`,
            );
            const data = await response.json();
            setPosts(data);
        };

        fetchCategory();
        fetchPosts();
    }, [categoryId]);

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
