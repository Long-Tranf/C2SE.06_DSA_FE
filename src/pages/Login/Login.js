import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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

        setLoading(true); // Bắt đầu quá trình đăng nhập
        try {
            // Tìm người dùng từ JSONPlaceholder (giả lập đăng nhập)
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users',
            );

            // Kiểm tra xem người dùng có tồn tại không
            const user = response.data.find(
                (user) => user.username === username,
            );
            if (user) {
                // Nếu tìm thấy người dùng, bạn có thể giả lập token và lưu nó
                localStorage.setItem('accessToken', 'dummyToken'); // Lưu token giả
                console.log('Đăng nhập thành công với người dùng:', user);
                navigate('/'); // Điều hướng đến trang chủ sau khi đăng nhập thành công
            } else {
                throw new Error('Người dùng không tồn tại.');
            }
        } catch (error) {
            // Xử lý lỗi khi đăng nhập thất bại
            setErrorMessage(error.message || 'Đăng nhập thất bại!');
            console.error('Đăng nhập thất bại:', error.message);
        } finally {
            setLoading(false); // Kết thúc quá trình đăng nhập
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
                    <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
                        <div className="col col-sm-6 col-lg-7 col-xl-6">
                            <div className="text-center mb-5">
                                <h3 className="fw-bold">Log In</h3>
                                <p className="text-secondary">
                                    Get access to your account
                                </p>
                            </div>
                            <button className="btn btn-lg btn-outline-secondary btn-online-custom w-100 mb-3">
                                <i className="bx bxl-google text-danger fs-200 me-1"></i>
                                Login with Google
                            </button>
                            <button className="btn btn-lg btn-outline-secondary btn-online-custom w-100">
                                <i className="bx bxl-facebook-circle text-primary fs-200 me-1 mt-2000"></i>
                                Login with Facebook
                            </button>

                            {/* Divider */}
                            <div className="position-relative">
                                <hr className="text-secondary divider"></hr>
                                <div className="divider-content-center">Or</div>
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
                                    <a href="#" className="fw-bold">
                                        Sign Up
                                    </a>
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
