import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Nav,
    Tab,
    Form,
    Button,
    Image,
} from 'react-bootstrap';
import './Profile.css';
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';

function Profile() {
    const [key, setKey] = useState('general');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const fetchUserData = async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            setUser(null);
            return;
        }

        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/kiem-tra-token-member',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setUser(response.data.user);
        } catch (error) {
            console.error('Token không hợp lệ hoặc lỗi hệ thống:', error);
            setUser(null);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('User not authorized');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/member/update/${user.id}`,
                {
                    user_name: user.user_name,
                    full_name: user.full_name,
                    subscriber_email: user.subscriber_email,
                    phone_number: user.phone_number,
                    address: user.address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setUser(response.data.member);
            alert('Cập nhật thông tin thành công');
            window.location.reload();
        } catch (error) {
            setErrors(error.response.data.errors);
            alert('Cập nhật thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('User not authorized');
            return;
        }

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/member/${user.id}/change-password`,
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

            alert('Đổi mật khẩu thành công');
            window.location.reload();
        } catch (error) {
            console.log('Error:', error); // Log error for debugging
            if (error.response && error.response.data.errors) {
                setPasswordError(error.response.data.errors);
                alert(error.response.data.message || 'Đã xảy ra lỗi');
            } else {
                alert('Đã xảy ra lỗi');
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div className="wrapper">
            <Header />
            <Container className="account-settings-container">
                <h1 className="account-settings-tittle">Account Settings</h1>
                <Row>
                    <Col md={3} className="account-settings-sidebar">
                        <Nav
                            variant="pills"
                            className="flex-column"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="general">General</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="change-password">
                                    Change Password
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={9} className="account-settings-content">
                        <Tab.Content>
                            <Tab.Pane
                                eventKey="general"
                                active={key === 'general'}
                                className="account-settings-general"
                            >
                                <Form onSubmit={handleUpdate}>
                                    <Form.Group className="mb-3 text-center">
                                        <Image
                                            src={
                                                user.avatar ||
                                                'https://bootdey.com/img/Content/avatar/avatar1.png'
                                            }
                                            roundedCircle
                                            className="account-settings-avatar-image mb-3"
                                        />
                                        <Form.Control
                                            type="file"
                                            className="account-settings-avatar"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Username
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={user.user_name || ''}
                                            readOnly
                                            className="account-settings-username"
                                        />
                                        {errors.user_name && (
                                            <p className="error-message">
                                                {errors.user_name[0]}
                                            </p>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Full Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={user.full_name || ''}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    full_name: e.target.value,
                                                })
                                            }
                                            className="account-settings-full-name"
                                        />
                                        {errors.full_name && (
                                            <p className="error-message">
                                                {errors.full_name[0]}
                                            </p>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={user.subscriber_email || ''}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    subscriber_email:
                                                        e.target.value,
                                                })
                                            }
                                            className="account-settings-email"
                                        />
                                        {errors.subscriber_email && (
                                            <p className="error-message">
                                                {errors.subscriber_email[0]}
                                            </p>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Phone Number
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={user.phone_number || ''}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    phone_number:
                                                        e.target.value,
                                                })
                                            }
                                            className="account-settings-phone-number"
                                        />
                                        {errors.phone_number && (
                                            <p className="error-message">
                                                {errors.phone_number[0]}
                                            </p>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Address
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={user.address || ''}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    address: e.target.value,
                                                })
                                            }
                                            className="account-settings-address"
                                        />
                                        {errors.address && (
                                            <p className="error-message">
                                                {errors.address[0]}
                                            </p>
                                        )}
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="account-settings-save-button"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane
                                eventKey="change-password"
                                active={key === 'change-password'}
                                className="account-settings-change-password"
                            >
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Current Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value,
                                                )
                                            }
                                            className="account-settings-current-password  current-pasword"
                                        />
                                        {passwordError.current_password && (
                                            <p className="error-message">
                                                {
                                                    passwordError
                                                        .current_password[0]
                                                }
                                            </p>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            New Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            className="account-settings-new-password"
                                        />
                                        {passwordError.new_password && (
                                            <p className="error-message">
                                                {passwordError.new_password[0]}
                                            </p>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Confirm New Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value,
                                                )
                                            }
                                            className="account-settings-confirm-password"
                                        />
                                        {passwordError.new_password_confirmation && (
                                            <p className="error-message">
                                                {
                                                    passwordError
                                                        .new_password_confirmation[0]
                                                }
                                            </p>
                                        )}
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="account-settings-change-password-button"
                                        onClick={handleChangePassword}
                                    >
                                        Change Password
                                    </Button>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default Profile;
