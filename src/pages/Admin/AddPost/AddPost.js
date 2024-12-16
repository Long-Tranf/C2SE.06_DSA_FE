import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import './AddPost.css';

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
        ],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image'],
        [{ font: ['sans-serif', 'serif', 'monospace', 'Times New Roman'] }],
        ['clean'],
    ],
};

const formats = [
    'header',
    'font',
    'list',
    'align',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'image',
];

function AddPost({ onBack }) {
    const { postId } = useParams(); // lấy postId từ url
    //const [curentPost, setCurentPost] = useState(null);
    const navigate = useNavigate();

    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postCategory, setPostCategory] = useState();
    const [postStatus, setPostStatus] = useState('');
    const [postAuthor, setPostAuthor] = useState();
    const [idAuthor, setIdAuthor] = useState();
    const [postImage, setPostImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isFetchingCategories, setIsFetchingCategories] = useState(true);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/Categories/data')
            .then((response) => {
                const allCategories = response.data.categories;
                const childCategories = allCategories.filter(
                    (category) => category.parent_category_id !== 0,
                );
                setCategories(childCategories);
                setIsFetchingCategories(false);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh mục:', error);
                setIsFetchingCategories(false);
            });
    }, []);

    useEffect(() => {
        if (postId) {
            axios
                .get(`http://127.0.0.1:8000/api/Post/data/${postId}`)
                .then((response) => {
                    const post = response.data.post;
                    setPostTitle(post.title);
                    setPostContent(post.content);
                    setPostCategory(post.category_id);
                    setPostStatus(post.is_open);
                    setPostAuthor(post.association.registrant_name);
                    setPostImage(post.image);
                })
                .catch((error) => {
                    console.error('Có lỗi xảy ra khi lấy bài viết:', error);
                    alert('Không thể lấy dữ liệu bài viết. Vui lòng thử lại!');
                });
        }
    }, [postId]);
    useEffect(() => {
        const fullName = localStorage.getItem('full_name');
        const id = localStorage.getItem('id_user');
        if (fullName && id) {
            setPostAuthor(fullName);
            setIdAuthor(id);
        } else {
            console.warn('Không tìm thấy full_name trong localStorage');
        }
    }, []);

    const handlePostContentChange = (value) => {
        setPostContent(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // const url = postId
        //     ? `http://127.0.0.1:8000/api/Post/update`
        //     : `http://127.0.0.1:8000/api/Post/create`;

        try {
            if (postId) {
                await axios.put(`http://127.0.0.1:8000/api/Post/update`, {
                    id: postId,
                    title: postTitle,
                    content: postContent,
                    category_id: Number(postCategory),
                    is_open: Number(postStatus),
                    member_id: 5,
                    image: postImage,
                });
            } else {
                await axios.post(`http://127.0.0.1:8000/api/Post/create`, {
                    title: postTitle,
                    content: postContent,
                    category_id: Number(postCategory),
                    is_open: Number(postStatus),
                    member_id: JSON.parse(localStorage.getItem('id_user')),
                    image: postImage,
                    view: 0,
                });
            }
            navigate('/dashboardadmin/post');
        } catch (error) {
            console.error('Có lỗi xảy ra khi lưu bài viết:', error);
            alert('Không thể lưu bài viết. Vui lòng thử lại!');
        } finally {
            setIsLoading(false);
        }
        //setCurentPost(null);
    };

    return (
        <div className="add-post-form">
            <button className="btn btn-back" onClick={onBack}>
                Quay lại Quản lý Bài Viết
            </button>
            <h2>{postId ? 'Chỉnh sửa Bài Viết' : 'Thêm Bài Viết Mới'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Tiêu đề</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="Nhập tiêu đề bài viết"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Nội dung</label>
                    <ReactQuill
                        value={postContent}
                        onChange={handlePostContentChange}
                        modules={modules}
                        formats={formats}
                        placeholder="Nhập nội dung bài viết..."
                    />
                </div>
                <div>
                    <label htmlFor="category">Danh mục</label>
                    {isFetchingCategories ? (
                        <p>Đang tải danh mục...</p>
                    ) : (
                        <select
                            id="category"
                            name="category"
                            value={postCategory}
                            onChange={(e) => setPostCategory(e.target.value)}
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div>
                    <label htmlFor="status">Trạng thái</label>
                    <select
                        id="status"
                        name="status"
                        value={postStatus}
                        onChange={(e) => setPostStatus(e.target.value)}
                    >
                        <option value="">-- Chọn trạng thái --</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="author">Tác giả</label>
                    <label>{postAuthor}</label>
                </div>
                <div>
                    <label htmlFor="image">Chọn Hình Ảnh</label>
                    <input
                        type="text"
                        id="image"
                        value={postImage}
                        onChange={(e) => setPostImage(e.target.value)} // Lấy đường dẫn ảnh từ input
                    />
                </div>
                <div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading
                            ? 'Đang lưu...'
                            : postId
                            ? 'Cập nhật Bài'
                            : 'Đăng Bài'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddPost;
