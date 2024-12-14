import { Outlet } from 'react-router-dom'; // Import Outlet
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '~/assets/image/logoadmin.png';
import './AdminDashboard.css';

function AdminDashboard() {
    const user = {
        name: 'admin123',
        isMaster: JSON.parse(localStorage.getItem('is_master')) || true, // Lấy giá trị `is_master` từ localStorage
    };

    const navigate = useNavigate();

    useEffect(() => {
        // Thêm class 'no-padding' khi vào Dashboard
        document.body.classList.add('no-padding');

        // Xóa class khi rời khỏi trang Dashboard (nếu cần)
        return () => {
            document.body.classList.remove('no-padding');
        };
    }, []);

    const handleLogout = () => {
        // Xóa thông tin đăng nhập và chuyển hướng đến trang login
        localStorage.removeItem('userRole');
        localStorage.removeItem('userToken');
        localStorage.removeItem('is_master');
        navigate('/loginadmin');
    };

    // Sidebar menu tùy theo quyền
    const sidebarMenu = user.isMaster
        ? [
              { path: '/dashboardadmin/user', label: 'User' },
              { path: '/dashboardadmin/association', label: 'Association' },
              { path: '/dashboardadmin/post', label: 'Post' },
              { path: '/dashboardadmin/category', label: 'Category' },
              { path: '/dashboardadmin/library', label: 'Library' },
              { path: '/dashboardadmin/contact', label: 'Contact' },
              { path: '/dashboardadmin/banner', label: 'Banner' },
              { path: '/dashboardadmin/event', label: 'Event' },
          ]
        : [
              { path: '/dashboardadmin/post', label: 'Post' },
              { path: '/dashboardadmin/post/add', label: 'Add New Post' },
              { path: '/dashboardadmin/event', label: 'Event' },
          ];

    return (
        <div className="admin-container">
            <div className="header-dashboard">
                <div className="dashboard-logo">
                    <img className="logo-img" src={logo} alt="Logo" />
                </div>
                <div className="admin-info">
                    <h4 className="admin-name">Xin Chào, {user.name}</h4>
                    <img
                        className="admin-avatar"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9z2IpZagy0I6RWL80m6dFmz60PsauqPR9Bw&s"
                        alt="Avatar"
                    />
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
                    {/* Render route con */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
