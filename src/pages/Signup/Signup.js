import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function Signup() {
    const [formData, setFormData] = useState({
        user_name: '',
        password: '',
        password_confirmation: '',
        avatar: 'http://example.com/avatar.jpg',
        full_name: '',
        address: '',
        subscriber_email: '',
        phone: '',
        is_open: true,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.body.classList.add('no-padding');
        return () => {
            document.body.classList.remove('no-padding');
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        console.log(formData);

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/dang-ky',
                {
                    user_name: formData.user_name,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation,
                    avatar: formData.avatar,
                    full_name: formData.full_name,
                    address: formData.address,
                    subscriber_email: formData.subscriber_email,
                    phone_number: formData.phone,
                    is_open: formData.is_open,
                },
            );

            alert(response.data.message);
            window.location.href = '/login';
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert('Có lỗi xảy ra. Vui lòng thử lại sau!');
            }
        }
    };

    return (
        <div className="App">
            <div className="row vh-100 g-0">
                {/* left */}
                <div className="col-lg-6 position-relative d-none d-lg-block">
                    <div
                        className="bg-holder"
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}/Screenshot_1.png)`,
                        }}
                    ></div>
                </div>
                {/* left */}

                {/* right */}
                <div className="col-lg-6">
                    <Link to={`/`} className="home-navigate">
                        <FontAwesomeIcon
                            icon={faHome}
                            className="home-navigate-icon"
                        />
                    </Link>
                    <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
                        <div className="col col-sm-6 col-lg-7 col-xl-6">
                            <div className="text-center mb-5">
                                <h3 className="fw-bold">Sign Up</h3>
                                <p className="text-secondary">
                                    Create your account
                                </p>
                            </div>

                            {/* form */}
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-user-circle"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg fs-6 ${
                                            errors.full_name ? 'is-invalid' : ''
                                        }`}
                                        placeholder="Full Name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                    />
                                    {errors.full_name && (
                                        <div className="invalid-feedback">
                                            {errors.full_name[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-user"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg fs-6 ${
                                            errors.user_name ? 'is-invalid' : ''
                                        }`}
                                        placeholder="Username"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleInputChange}
                                    />
                                    {errors.user_name && (
                                        <div className="invalid-feedback">
                                            {errors.user_name[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-envelope"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg fs-6 ${
                                            errors.subscriber_email
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        placeholder="E-mail"
                                        name="subscriber_email"
                                        value={formData.subscriber_email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.subscriber_email && (
                                        <div className="invalid-feedback">
                                            {errors.subscriber_email[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-phone"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg fs-6 ${
                                            errors.phone_number
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        placeholder="Phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                    {errors.phone_number && (
                                        <div className="invalid-feedback">
                                            {errors.phone_number[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-map"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg fs-6 ${
                                            errors.address ? 'is-invalid' : ''
                                        }`}
                                        placeholder="Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                    {errors.address && (
                                        <div className="invalid-feedback">
                                            {errors.address[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-lock-alt"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className={`form-control form-control-lg fs-6 ${
                                            errors.password ? 'is-invalid' : ''
                                        }`}
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-lock-open-alt"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg fs-6"
                                        placeholder="Confirm Password"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100 mb-3"
                                >
                                    Sign Up
                                </button>
                            </form>
                            {/* form */}

                            <div className="text-center">
                                <small>
                                    You have an account?{' '}
                                    <Link to={`/login`} className="fw-bold">
                                        Login
                                    </Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                {/* right */}
            </div>
            <link
                href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
            ></link>
        </div>
    );
}

export default Signup;
