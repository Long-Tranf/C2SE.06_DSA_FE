import React, { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css';

const ChangePassword = ({ userId }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage(
                    'Vui lòng đăng nhập trước khi thay đổi mật khẩu.',
                );
                return;
            }

            const userId = localStorage.getItem('id_user');

            const response = await axios.post(
                `http://127.0.0.1:8000/api/Associations/${userId}/change-password`,
                {
                    current_password: currentPassword,
                    new_password: newPassword,
                    new_password_confirmation: confirmPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.status === 200) {
                setSuccessMessage('Mật khẩu đã được thay đổi thành công!');
                setErrorMessage('');
                setTimeout(() => window.location.reload(), 500);
            }
        } catch (error) {
            console.log(error.response.data.message);
            if (error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrorMessage(error.response.data.message);
            }
            setSuccessMessage('');
        }
    };

    return (
        <div className="change-password-container">
            <h2 className="change-password-title">Thay Đổi Mật Khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {errors?.current_password && (
                        <p className="error-message">
                            {errors.current_password[0]}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {errors.new_password && (
                        <p className="error-message">
                            {errors.new_password[0]}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Xác nhận mật khẩu mới
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.new_password_confirmation && (
                        <p className="error-message">
                            {errors.new_password_confirmation[0]}
                        </p>
                    )}
                </div>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}

                <button type="submit" className="btn-submit">
                    Thay đổi mật khẩu
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
