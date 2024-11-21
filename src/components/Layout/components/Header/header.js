import React, { useState, useEffect } from 'react';
import './header.css';
import moment from 'moment';
import banner from '~/assets/image/banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faArrowDown,
    faGlobe,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/Layout/components/Search/index';
import avatar from '~/assets/image/no-img.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import { Link } from 'react-router-dom';

function Header() {
    const [curr, setCurr] = useState(moment());
    const [currentUser, setCurrentUser] = useState(true);
    const formattedDate = curr.format('DD MMMM YYYY HH:mm:ss');

    const user = {
        name: 'Đình Long',
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/a5d6f67a025f7175ebb766f2532aa4de~c5_720x720.jpeg?lk3s=a5d48078&nonce=95564&refresh_token=4bf0525411d3c50613a1e0867085791e&x-expires=1732348800&x-signature=xHkbbt0z3tj99p0NeA91H3h97hc%3D&shp=a5d48078&shcp=81f88b70&quot;);',
    };

    useEffect(() => {
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
                    {currentUser ? (
                        <>
                            <h4 className="user-name">Xin Chào, {user.name}</h4>
                            <Tippy
                                content={
                                    <div className="profile">
                                        <a className="profile-item">
                                            <FontAwesomeIcon icon={faUser} />
                                            <h4>Profile</h4>
                                        </a>
                                        <a
                                            className="profile-item"
                                            onClick={() =>
                                                setCurrentUser(false)
                                            }
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
                                    src={user.avatar || avatar}
                                    className="avatar"
                                ></img>
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
            <div className="banner">
                <img src={banner} alt="banner" className="banner-img" />
            </div>
            <div className="navigation">
                <ul className="menu-list">
                    <li className="menu-list-item">
                        <h2>Sự kiện</h2>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className="menu-item-icon"
                        />
                        <ul className="sub-menu-list">
                            <li className="sub-menu-item">
                                <Link to="/category" className="menu-link">
                                    Tài nguyên – Chính sách mới
                                </Link>
                            </li>
                            <li className="sub-menu-item">
                                Từ suy nghĩ đến bàn phím
                            </li>
                            <li className="sub-menu-item">
                                Chia sẻ giải pháp, thành tựu
                            </li>
                        </ul>
                    </li>
                    <li className="menu-list-item">
                        <h2>Cộng đồng chúng ta</h2>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className="menu-item-icon"
                        />
                        <ul className="sub-menu-list">
                            <li className="sub-menu-item">Mái nhà chung</li>
                            <li className="sub-menu-item">Gia nhập DSA</li>
                            <li className="sub-menu-item">Sự kiện sắp đến</li>
                            <li className="sub-menu-item">
                                Hội viên kể chuyện
                            </li>
                        </ul>
                    </li>
                    <li className="menu-list-item">
                        <h2>Nguồn nhân lực IT</h2>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className="menu-item-icon"
                        />
                        <ul className="sub-menu-list">
                            <li className="sub-menu-item">
                                Đào tạo nguồn nhân lực
                            </li>
                            <li className="sub-menu-item">Tuyển Dụng</li>
                        </ul>
                    </li>
                    <li className="menu-list-item">
                        <h2>Góc nhìn DSA</h2>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className="menu-item-icon"
                        />
                        <ul className="sub-menu-list">
                            <li className="sub-menu-item">Đà Nẵng 24h</li>
                            <li className="sub-menu-item">Du Lịch</li>
                            <li className="sub-menu-item">Kỹ năng sống</li>
                            <li className="sub-menu-item">
                                Văn hóa - Nghệ thu
                            </li>
                        </ul>
                    </li>
                </ul>

                <Search className="search" />
            </div>
        </div>
    );
}

export default Header;
