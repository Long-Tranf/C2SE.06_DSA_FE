import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setErrorMessage('Vui lòng nhập username và password.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8000/api/member/dang-nhap',
                {
                    user_name: username,
                    password: password,
                },
            );

            if (response.data.status === true) {
                localStorage.setItem('accessToken', response.data.token);
                navigate('/');
            } else {
                setErrorMessage(response.data.message || 'Đăng nhập thất bại!');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Đăng nhập thất bại!');
            console.error('Đăng nhập thất bại:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <div className="row vh-100 g-0">
                {/* Left */}
                <div className="col-lg-6 position-relative d-none d-lg-block">
                    <div
                        className="bg-holder"
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}/Screenshot_1.png)`,
                        }}
                    ></div>
                </div>
                {/* Left */}

                {/* Right */}
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
                                <h3 className="fw-bold">Log In</h3>
                                <p className="text-secondary">
                                    Get access to your account
                                </p>
                            </div>

                            {/* Form */}
                            <form action="#">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-user"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg fs-6"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-lock-alt"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg fs-6"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                {errorMessage && (
                                    <div className="text-danger mb-3">
                                        {errorMessage}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg w-100 mb-3"
                                    onClick={handleLogin}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang đăng nhập...' : 'Login'}
                                </button>
                            </form>
                            {/* Form */}

                            <div className="text-center">
                                <small>
                                    Don't have an account?{' '}
                                    <Link to={`/signup`} className="fw-bold">
                                        Sign Up
                                    </Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right */}
            </div>
        </div>
    );
}

export default Login;
