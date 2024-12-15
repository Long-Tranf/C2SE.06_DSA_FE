import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginAdmin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true); // Bắt đầu trạng thái loading
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/association/dang-nhap',
                {
                    user_name: username,
                    password: password,
                },
            );

            setIsLoading(false); // Kết thúc trạng thái loading

            if (response.data.status) {
                // Lưu token và thông tin người dùng
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_name', response.data.user_name);

                // Chuyển hướng đến trang admin-dashboard
                navigate('/dashboardadmin');
            } else {
                setErrorMessage(response.data.message); // Hiển thị lỗi từ backend
            }
        } catch (error) {
            setIsLoading(false); // Kết thúc trạng thái loading
            setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.'); // Lỗi kết nối
            console.error(error);
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
                                <h3 className="fw-bold">Log In For Admin</h3>
                                <p className="text-secondary">
                                    Get access to your account
                                </p>
                            </div>

                            {/* Form */}
                            <form>
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
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Login'}
                                </button>
                            </form>
                            {/* Form */}
                        </div>
                    </div>
                </div>
                {/* Right */}
            </div>
        </div>
    );
}

export default LoginAdmin;
