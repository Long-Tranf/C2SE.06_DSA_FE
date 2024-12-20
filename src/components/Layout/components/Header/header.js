import React, { useState, useEffect } from 'react';
import './header.css';
import moment from 'moment';
import axios from 'axios';
import banner from '~/assets/image/banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faSignOut,
    faUser,
    faBell,
    faHome,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/Layout/components/Search/index';
import avatarPlaceholder from '~/assets/image/no-img.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import { Link } from 'react-router-dom';

function Header() {
    require('moment/locale/vi');
    moment.locale('vi');
    const [curr, setCurr] = useState(moment());
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showHiddenMenu, setshowHiddenMenu] = useState(true);
    const formattedDate = curr.format('DD MMMM YYYY HH:mm:ss');
    const [active, setActive] = useState('');

    useEffect(() => {
        async function fetchUserData() {
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

                setUser(response.data.user);

                const eventsResponse = await axios.get(
                    'http://127.0.0.1:8000/api/events/latest',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                setNotifications(eventsResponse.data);
            } catch {
                setUser(null);
            }
        }

        fetchUserData();

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
            });

        const time = setInterval(() => {
            setCurr(moment());
        }, 1000);

        return () => clearInterval(time);
    }, []);

    const handleShowHiddenMenu = () => {
        setshowHiddenMenu(!showHiddenMenu);
        setActive('active');
    };

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
                                            href="/"
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
                                interactive
                                placement="bottom-start"
                                offset={[-70, 10]}
                                delay={[0, 200]}
                                theme="light"
                            >
                                <img
                                    src={
                                        (user.avatar &&
                                        user.avatar.startsWith('http')
                                            ? user.avatar
                                            : `http://127.0.0.1:8000/storage/${user.avatar}`) ||
                                        avatarPlaceholder
                                    }
                                    className="avatar"
                                    alt="User Avatar"
                                />
                            </Tippy>

                            <Tippy
                                content={
                                    <div className="notification-popover">
                                        <ul>
                                            {notifications.map((notif) => (
                                                <li
                                                    key={notif.id}
                                                    className="notif-item"
                                                >
                                                    <Link
                                                        to={`/event`}
                                                        className="notification-link"
                                                    >
                                                        {`Sự kiện ${notif.title} đang diễn ra`}
                                                    </Link>
                                                    <span className="notification-date">
                                                        {`Ngày kết thúc : ${new Date(
                                                            notif.event_date,
                                                        ).toLocaleDateString()}`}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                interactive
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
                <div className="menu-btn" onClick={handleShowHiddenMenu}>
                    <FontAwesomeIcon icon={faBars} className="menu-icon" />
                </div>
                <div className="home-button">
                    <Link to="/" className="home-link">
                        <FontAwesomeIcon icon={faHome} className="home-icon" />
                    </Link>
                </div>
                {showHiddenMenu && (
                    <ul className="menu-list">
                        <li className={`home-item ${active}`}>
                            <Link to="/" className="">
                                Home
                            </Link>
                        </li>
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
                        <li className="menu-list-item">
                            <h2>Dành Cho Hội Viên</h2>
                            <FontAwesomeIcon
                                icon={faAngleDown}
                                className="menu-item-icon"
                            />
                            <ul className="sub-menu-list">
                                <li className="sub-menu-item">
                                    <Link to="/event" className="menu-link">
                                        Sự Kiện
                                    </Link>
                                </li>
                                <li className="sub-menu-item">
                                    <Link to="/library" className="menu-link">
                                        Thư Viện Ảnh
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                )}
                <Search className="search" />
            </div>
        </div>
    );
}

export default Header;
