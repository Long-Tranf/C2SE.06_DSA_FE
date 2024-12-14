import React, { useState, useEffect } from 'react';
import './header.css';
import moment from 'moment';
import axios from 'axios';
import banner from '~/assets/image/banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faGlobe,
    faSignOut,
    faUser,
    faBell,
} from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/Layout/components/Search/index';
import avatarPlaceholder from '~/assets/image/no-img.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import { Link } from 'react-router-dom';

function Header() {
    const [curr, setCurr] = useState(moment());
    const [user, setUser] = useState(null); // Lưu thông tin người dùng
    const [notifications, setNotifications] = useState([]);
    const [categories, setCategories] = useState([]);
    const formattedDate = curr.format('DD MMMM YYYY HH:mm:ss');

    useEffect(() => {
        // Kiểm tra token và lấy thông tin người dùng
        async function fetchUserData() {
            const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage

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
        }

        fetchUserData();

        // Fetch danh mục từ API
        axios
            .get('http://127.0.0.1:8000/api/Categories/data')
            .then((response) => {
                const categoryData = response.data.categories;
                const topLevelCategories = categoryData.filter(
                    (cat) => cat.parent_category_id === 0 && cat.is_open,
                );
                const subCategories = categoryData.filter(
                    (cat) => cat.parent_category_id !== 0 && cat.is_open,
                );
                const categoryMap = topLevelCategories.map((category) => {
                    const subMenu = subCategories.filter(
                        (sub) => sub.parent_category_id === category.id,
                    );
                    return {
                        ...category,
                        subMenu,
                    };
                });
                setCategories(categoryMap);
            })
            .catch((error) =>
                console.error('Error fetching categories:', error),
            );

        // Simulate thông báo
        const postNotifications = [
            'Hội viên 1 đã đăng bài viết "Tiêu đề bài viết 1"',
            'Hội viên 2 đã đăng bài viết "Tiêu đề bài viết 2"',
            'Hội viên 3 đã đăng bài viết "Tiêu đề bài viết 3"',
        ];
        setNotifications(postNotifications);

        // Update thời gian hiện tại mỗi giây
        const time = setInterval(() => {
            setCurr(moment());
        }, 1000);
        return () => clearInterval(time);
    }, []);

    return (
        <div className="header-container">
            <div className="top-header">
                <span className="current-date-time">{formattedDate}</span>
                <div className="info">
                    {user ? (
                        <>
                            <h4 className="user-name">
                                Xin Chào, {user.full_name}
                            </h4>
                            <Tippy
                                content={
                                    <div className="profile">
                                        <Link
                                            to="/profile"
                                            className="profile-item"
                                        >
                                            <FontAwesomeIcon icon={faUser} />
                                            <h4>Profile</h4>
                                        </Link>
                                        <a
                                            className="profile-item"
                                            onClick={() => {
                                                localStorage.removeItem(
                                                    'accessToken',
                                                );
                                                setUser(null);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faSignOut} />
                                            <h4>Logout</h4>
                                        </a>
                                    </div>
                                }
                                interactive={true}
                                placement="bottom-start"
                                offset={[20, 10]}
                                delay={[0, 200]}
                                theme="light"
                            >
                                <img
                                    src={user.avatar || avatarPlaceholder}
                                    className="avatar"
                                    alt="User Avatar"
                                />
                            </Tippy>

                            <Tippy
                                content={
                                    <div className="notification-popover">
                                        <ul>
                                            {notifications.map(
                                                (notif, index) => (
                                                    <li key={index}>{notif}</li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                }
                                interactive={true}
                                placement="bottom-start"
                                offset={[20, 10]}
                                delay={[0, 200]}
                                theme="light"
                            >
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className="bell-icon"
                                />
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <div className="info-item language">
                                <a className="icon youtube" href="">
                                    <FontAwesomeIcon icon={faGlobe} />
                                </a>
                                <span className="language-selected">
                                    English
                                </span>
                            </div>
                            <Link to="/signup" className="info-item authen">
                                Signup
                            </Link>
                            <Link to="/login" className="info-item authen">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="banner-header">
                <img src={banner} alt="banner" className="banner-img" />
            </div>
            <div className="navigation">
                <ul className="menu-list">
                    {categories.map((category) => (
                        <li key={category.id} className="menu-list-item">
                            <h2>{category.category_name}</h2>
                            <FontAwesomeIcon
                                icon={faAngleDown}
                                className="menu-item-icon"
                            />
                            {category.subMenu.length > 0 && (
                                <ul className="sub-menu-list">
                                    {category.subMenu.map((subCategory) => (
                                        <li
                                            key={subCategory.id}
                                            className="sub-menu-item"
                                        >
                                            <Link
                                                to={`/category/${subCategory.id}`}
                                                className="menu-link"
                                            >
                                                {subCategory.category_name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <Search className="search" />
            </div>
        </div>
    );
}

export default Header;
