import { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import logo from '~/assets/image/logoadmin.png';
import './AdminDashboard.css';

function AdminDashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // const id = localStorage.getItem('id_user');
    // console.log(id);

    useEffect(() => {
        document.body.classList.add('no-padding');
        return () => {
            document.body.classList.remove('no-padding');
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://127.0.0.1:8000/api/kiem-tra-token-association', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (response.data.status) {
                        setUser(response.data.user);
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi kiểm tra token:', error);
                    navigate('/loginadmin');
                });
        } else {
            navigate('/loginadmin');
        }
    }, [navigate]);
    useEffect(() => {
        if (user) {
            localStorage.setItem('id_user', user.id);
            localStorage.setItem('isMaster', user.is_master);
            localStorage.setItem('full_name', user.registrant_name);
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('full_name');
        localStorage.removeItem('token');
        localStorage.removeItem('isMaster');
        localStorage.removeItem('id_user');
        localStorage.removeItem('user_name');
        navigate('/loginadmin');
    };

    const sidebarMenu = user?.is_master
        ? [
              { path: '/dashboardadmin/statistic', label: 'Thống Kê' },
              { path: '/dashboardadmin/member', label: 'Member' },
              { path: '/dashboardadmin/association', label: 'Hiệp Hội' },
              { path: '/dashboardadmin/post', label: 'Bài Viết' },
              { path: '/dashboardadmin/category', label: 'Danh Mục' },
              { path: '/dashboardadmin/library', label: 'Thư Viện' },
              { path: '/dashboardadmin/contact', label: 'Góp Ý' },
              { path: '/dashboardadmin/banner', label: 'Banner' },
              { path: '/dashboardadmin/event', label: 'Sự Kiện' },
          ]
        : [
              { path: '/dashboardadmin/AssociationProfile', label: 'Profile' },
              { path: '/dashboardadmin/changepassword', label: 'Đổi Mật Khẩu' },
              { path: '/dashboardadmin/post', label: 'Bài Viết' },
              { path: '/dashboardadmin/post/add', label: 'Thêm Mới Bài Viết' },
              { path: '/dashboardadmin/event', label: 'Sự Kiện' },
          ];

    return (
        <div className="admin-container">
            <div className="header-dashboard">
                <div className="dashboard-logo">
                    <img className="logo-img" src={logo} alt="Logo" />
                </div>
                <div className="admin-info">
                    {user ? (
                        <>
                            <h4 className="admin-name">
                                Xin Chào, {user.registrant_name}
                            </h4>
                            <img
                                className="admin-avatar"
                                src={
                                    user.avatar ||
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9z2IpZagy0I6RWL80m6dFmz60PsauqPR9Bw&s'
                                }
                                alt="Avatar"
                            />
                        </>
                    ) : (
                        <h4>Loading...</h4>
                    )}
                </div>
            </div>

            <div className="dashboard-content">
                <div className="sidebar">
                    <ul className="sidebar-menu">
                        {sidebarMenu.map((item, index) => (
                            <li key={index} className="menu-item">
                                <Link to={item.path}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="logout-btn" onClick={handleLogout}>
                        Đăng xuất
                    </div>
                </div>

                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
