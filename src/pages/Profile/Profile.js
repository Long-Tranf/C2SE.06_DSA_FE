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
            setUser(response.data.user); // Lưu thông tin người dùng vào state
        } catch (error) {
            console.error('Token không hợp lệ hoặc lỗi hệ thống:', error);
            setUser(null); // Token không hợp lệ
        }
    };

    // Gọi hàm fetchUserData khi component được render lần đầu
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
                                <Form>
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
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
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
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Birthdate
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={user.birthdate || ''}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    birthdate: e.target.value,
                                                })
                                            }
                                            className="account-settings-birthdate"
                                        />
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
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="account-settings-save-button"
                                    >
                                        Save Changes
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
                                            className="account-settings-current-password"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            New Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            className="account-settings-new-password"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="account-settings-form-control-label">
                                            Confirm New Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            className="account-settings-confirm-password"
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="account-settings-change-password-button"
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
