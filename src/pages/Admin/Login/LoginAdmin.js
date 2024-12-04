import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginAdmin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Giả lập hàm xác thực người dùng (từ API)
    const authenticateUser = async (username, password) => {
        // Đây là ví dụ mô phỏng API
        // Bạn sẽ thay thế nó bằng gọi API thực tế để lấy dữ liệu người dùng
        const users = [
            { username: 'john_doe', password: '1234', role: 'admin' },
            { username: 'member_user', password: '5678', role: 'member' },
            { username: 'regular_user', password: 'abcd', role: 'user' },
        ];

        // Tìm người dùng trong mảng giả lập
        const user = users.find(
            (u) => u.username === username && u.password === password,
        );
        return user;
    };

    const handleLogin = async () => {
        const user = await authenticateUser(username, password);

        if (user) {
            // Lưu thông tin người dùng vào localStorage hoặc context nếu cần thiết
            localStorage.setItem('userRole', user.role);

            // Chuyển hướng theo vai trò
            if (user.role === 'admin') {
                navigate('/admin-dashboard');
            } else if (user.role === 'member') {
                navigate('/member-dashboard');
            } else {
                navigate('/');
            }
        } else {
            setErrorMessage('Invalid username or password');
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
                                >
                                    Login
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
