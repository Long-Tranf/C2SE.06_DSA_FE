import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssociationProfile.css';

function AssociationProfile() {
    const [formData, setFormData] = useState({
        id: JSON.parse(localStorage.getItem('id_user')),
        avatar: '',
        registrant_name: '',
        website: '',
        phone_number: '',
        registered_phone_number: '',
        company_name: '',
        company_email: '',
        subscriber_email: '',
        address: '',
    });
    const [errors, setErrors] = useState({});

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
                        phone_number: data.phone_number || '',
                        registered_phone_number:
                            data.registered_phone_number || '',
                        address: data.address || '',
                        company_email: data.company_email || '',
                        subscriber_email: data.subscriber_email || '',
                        company_name: data.company_name || '',
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
                .put(
                    `http://127.0.0.1:8000/api/Associations/update/${idUser}`,
                    formData,
                )
                .then((response) => {
                    console.log('Dữ liệu đã được cập nhật:', response.data);
                    alert('Cập nhật thành công!');
                })
                .catch((error) => {
                    console.error('Lỗi khi cập nhật profile:', error);
                    if (error.response && error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    } else {
                        alert('Có lỗi xảy ra, vui lòng thử lại.');
                    }
                });
        } else {
            alert('Không tìm thấy ID user!');
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
                            htmlFor="registrant_name"
                        >
                            Tên Hiển Thị
                        </label>
                        <input
                            type="text"
                            id="registrant_name"
                            name="registrant_name"
                            value={formData.registrant_name}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập Tên Hiển Thị"
                        />
                        {errors.registrant_name && (
                            <p className="error-message">
                                {errors.registrant_name[0]}
                            </p>
                        )}
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
                        {errors.website && (
                            <p className="error-message">{errors.website[0]}</p>
                        )}
                    </div>
                </div>

                <div className="profile-edit__form-row">
                    <div className="profile-edit__form-group">
                        <label
                            className="profile-edit__label"
                            htmlFor="subscriber_email"
                        >
                            Email Đăng Ký
                        </label>
                        <input
                            type="text"
                            id="subscriber_email"
                            name="subscriber_email"
                            value={formData.subscriber_email}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập Email Đăng Ký"
                        />
                        {errors.subscriber_email && (
                            <p className="error-message">
                                {errors.subscriber_email[0]}
                            </p>
                        )}
                    </div>
                    <div className="profile-edit__form-group">
                        <label
                            className="profile-edit__label"
                            htmlFor="company_email"
                        >
                            Email Hiệp Hội
                        </label>
                        <input
                            id="company_email"
                            name="company_email"
                            value={formData.company_email}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập Email Hiệp Hội"
                        />
                        {errors.company_email && (
                            <p className="error-message">
                                {errors.company_email[0]}
                            </p>
                        )}
                    </div>
                </div>

                <div className="profile-edit__form-row">
                    <div className="profile-edit__form-group">
                        <label
                            className="profile-edit__label"
                            htmlFor="phone_number"
                        >
                            Số Điện Thoại
                        </label>
                        <input
                            type="tel"
                            id="phone_nnumber"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập số điện thoại"
                        />
                        {errors.phone_number && (
                            <p className="error-message">
                                {errors.phone_number[0]}
                            </p>
                        )}
                    </div>
                    <div className="profile-edit__form-group">
                        <label
                            className="profile-edit__label"
                            htmlFor="registered_phone_number"
                        >
                            Số Điện Thoại Đăng ký
                        </label>
                        <input
                            id="registered_phone_number"
                            name="registered_phone_number"
                            value={formData.registered_phone_number}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập Số Điện Thoại Đăng Ký"
                        />
                        {errors.registered_phone_number && (
                            <p className="error-message">
                                {errors.registered_phone_number[0]}
                            </p>
                        )}
                    </div>
                </div>

                <div className="profile-edit__form-row">
                    <div className="profile-edit__form-group">
                        <label
                            className="profile-edit__label"
                            htmlFor="company_name"
                        >
                            Tên Hiệp Hội
                        </label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className="profile-edit__input"
                            placeholder="Nhập tên hiệp hội"
                        />
                        {errors.company_name && (
                            <p className="error-message">
                                {errors.company_name[0]}
                            </p>
                        )}
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
                        {errors.address && (
                            <p className="error-message">{errors.address[0]}</p>
                        )}
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
