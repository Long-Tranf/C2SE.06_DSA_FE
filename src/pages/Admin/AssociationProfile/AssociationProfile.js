import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssociationProfile.css';

function AssociationProfile() {
    const [formData, setFormData] = useState({
        id: JSON.parse(localStorage.getItem('id_user')),
        avatar: '',
        registrant_name: '',
        website: '',
        phoneNumber: '',
        address: '',
    });

    console.log(JSON.parse(localStorage.getItem('id_user')));

    useEffect(() => {
        const id_admin = localStorage.getItem('id_user');
        if (id_admin) {
            axios
                .get(`http://127.0.0.1:8000/api/Associations/${id_admin}`)
                .then((response) => {
                    const data = response.data;
                    setFormData({
                        avatar: data.avatar || '',
                        registrant_name: data.registrant_name || '',
                        website: data.website || '',
                        phoneNumber: data.phone_number || '',
                        address: data.address || '',
                    });
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy thông tin profile:', error);
                });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, avatar: imageUrl });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const idUser = localStorage.getItem('id_user');
        if (idUser) {
            axios
                .put(`http://127.0.0.1:8000/api/Association/update`, formData)
                .then((response) => {
                    console.log('Dữ liệu đã được cập nhật:', response.data);
                    alert('Cập nhật thành công!');
                })
                .catch((error) => {
                    console.error('Lỗi khi cập nhật profile:', error);
                    alert('Có lỗi xảy ra, vui lòng thử lại.');
                });
        }
    };

    return (
        <div className="profile-edit">
            <h1 className="profile-edit__title">Chỉnh Sửa Profile</h1>

            <div className="profile-edit__avatar-container">
                <div className="profile-edit__avatar-preview">
                    <img
                        src={
                            formData.avatar || 'https://via.placeholder.com/120'
                        }
                        alt="Avatar Preview"
                        className="profile-edit__avatar-image"
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="profile-edit__avatar-input"
                />
            </div>

            <form className="profile-edit__form" onSubmit={handleSubmit}>
                <div className="profile-edit__form-row">
                    <div className="profile-edit__form-group">
                        <label
                            className="profile-edit__label"
                            htmlFor="nameDisplay"
                        >
                            Tên Hiển Thị
                        </label>
                        <input
                            type="text"
                            id="nameDisplay"
                            name="nameDisplay"
                            value={formData.registrant_name}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập Tên Hiển Thị"
                        />
                    </div>
                    <div className="profile-edit__form-group">
                        <label
                            className="profile-edit__label"
                            htmlFor="website"
                        >
                            Website
                        </label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập đường dẫn website"
                        />
                    </div>
                </div>

                <div className="profile-edit__form-row">
                    <div className="profile-edit__form-group">
                        <label
                            className="profile-edit__label"
                            htmlFor="phoneNumber"
                        >
                            Số Điện Thoại
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <div className="profile-edit__form-group">
                        <label
                            className="profile-edit__label"
                            htmlFor="address"
                        >
                            Địa Chỉ
                        </label>
                        <input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập địa chỉ"
                        />
                    </div>
                </div>

                <button type="submit" className="profile-edit__button">
                    Lưu Thay Đổi
                </button>
            </form>
        </div>
    );
}

export default AssociationProfile;
