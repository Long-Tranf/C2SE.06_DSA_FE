import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '~/assets/image/logoadmin.png';
import './AdminDashboard.css';
import UserManagement from '~/pages/Admin/UserManagement/UserManagement';
import PostManagement from '~/pages/Admin/PostManagement/PostManagement';
import CategoryManagement from '~/pages/Admin/CategoryManagement/CategoryManagement';
import AssociationManagement from '~/pages/Admin/AssociationManagement/AssociationManagement';
import ContantManagement from '~/pages/Admin/ContantManagement/ContantManagement';
import LibraryManagement from '~/pages/Admin/LibraryManagement/LibraryManagement';

function AdminDashboard() {
    const admin = {
        name: 'admin123',
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
        navigate('/loginadmin');
    };

    return (
        <div className="admin-container">
            <div className="header-dashboard">
                <div className="dashboard-logo">
                    <img className="logo-img" src={logo} alt="Logo" />
                </div>
                <div className="admin-info">
                    <h4 className="admin-name">Xin Chào, {admin.name}</h4>
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
                        <li className="menu-item">User</li>
                        <li className="menu-item">Association</li>
                        <li className="menu-item">Post</li>
                        <li className="menu-item">Category</li>
                        <li className="menu-item">Library</li>
                        <li className="menu-item">Contact</li>
                    </ul>
                    <div className="logout-btn" onClick={handleLogout}>
                        Đăng xuất
                    </div>
                </div>
                <div className="content">
                    <LibraryManagement />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
