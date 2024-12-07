import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Sử dụng useParams để lấy postId từ URL
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Thêm style cho quill editor
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
    const { postId } = useParams(); // Lấy postId từ URL
    const navigate = useNavigate();
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const [postStatus, setPostStatus] = useState('');
    const [postAuthor, setPostAuthor] = useState('');

    // Giả sử bạn sẽ lấy dữ liệu bài viết từ API hoặc từ mảng dữ liệu có sẵn
    useEffect(() => {
        if (postId) {
            // Gọi API để lấy bài viết theo postId
            fetch(`http://localhost:5000/posts/${postId}`)
                .then((response) => response.json())
                .then((post) => {
                    setPostTitle(post.title);
                    setPostContent(post.content);
                    setPostCategory(post.category);
                    setPostStatus(post.status);
                    setPostAuthor(post.author);
                })
                .catch((error) =>
                    console.error('Có lỗi xảy ra khi lấy bài viết:', error),
                );
        }
    }, [postId]);

    const handlePostContentChange = (value) => {
        setPostContent(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            title: postTitle,
            content: postContent,
            category: postCategory,
            status: postStatus,
            author: postAuthor,
        };

        if (postId) {
            // Chỉnh sửa bài viết (gửi PUT request)
            fetch(`http://localhost:5000/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
                .then((response) => response.json())
                .then((updatedPost) => {
                    console.log('Bài viết đã được cập nhật:', updatedPost);
                    navigate('/dashboardadmin/post'); // Điều hướng về trang quản lý bài viết sau khi lưu
                })
                .catch((error) =>
                    console.error(
                        'Có lỗi xảy ra khi cập nhật bài viết:',
                        error,
                    ),
                );
        } else {
            // Thêm mới bài viết (gửi POST request)
            fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
                .then((response) => response.json())
                .then((newPost) => {
                    console.log('Bài viết mới đã được đăng:', newPost);
                    navigate('/dashboardadmin/post'); // Điều hướng về trang quản lý bài viết sau khi lưu
                })
                .catch((error) =>
                    console.error('Có lỗi xảy ra khi đăng bài viết:', error),
                );
        }
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
                    <select
                        id="category"
                        name="category"
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value)}
                    >
                        <option value="">-- Chọn danh mục --</option>
                        <option value="Tech">Công nghệ</option>
                        <option value="Health">Sức khỏe</option>
                        <option value="Education">Giáo dục</option>
                    </select>
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
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="author">Tác giả</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={postAuthor}
                        onChange={(e) => setPostAuthor(e.target.value)}
                        placeholder="Nhập tên tác giả"
                    />
                </div>
                <div>
                    <button type="submit">
                        {postId ? 'Cập nhật Bài' : 'Đăng Bài'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddPost;
