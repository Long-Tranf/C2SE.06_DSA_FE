import React, { useState, useEffect } from 'react';
import './header.css';
import moment from 'moment';
import banner from '~/assets/image/banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/Layout/components/Search/index';

function Header() {
    const [curr, setCurr] = useState(moment());

    useEffect(() => {
        const time = setInterval(() => {
            setCurr(moment());
        }, 1000);
        return () => clearInterval(time);
    }, []);

    const formattedDate = curr.format('DD MMMM YYYY HH:mm:ss');

    const [currentUser, setCurrentUser] = useState(true);

    return (
        <div className="header-container">
            <div className="top-header">
                <span className="current-date-time">{formattedDate}</span>
                <div className="info">
                    {currentUser ? (
                        <>
                            <a className="info-item">Profile</a>
                            <a
                                className="info-item"
                                onClick={() => setCurrentUser(false)}
                            >
                                Logout
                            </a>
                        </>
                    ) : (
                        <>
                            <a className="info-item">Information</a>
                            <a className="info-item">Contact</a>
                            <div className="info-item language">
                                <a className="icon youtube" href="">
                                    <FontAwesomeIcon icon={faGlobe} />
                                </a>
                                <span className="language-selected">
                                    English
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="banner">
                <img src={banner} alt="banner" className="banner-img" />
            </div>
            <div className="navigation">
                {/* <ul className="menu-list">
                    <li className="menu-list-item">
                        <h2>Sự kiện</h2>
                        <FaAngleDown className="menu-item-icon" />
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
                        <FaAngleDown className="menu-item-icon" />
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
                        <FaAngleDown className="menu-item-icon" />
                        <ul className="sub-menu-list">
                            <li className="sub-menu-item">
                                Đào tạo nguồn nhân lực
                            </li>
                            <li className="sub-menu-item">Tuyển Dụng</li>
                        </ul>
                    </li>
                    <li className="menu-list-item">
                        <h2>Góc nhìn DSA</h2>
                        <FaAngleDown className="menu-item-icon" />
                        <ul className="sub-menu-list">
                            <li className="sub-menu-item">Đà Nẵng 24h</li>
                            <li className="sub-menu-item">Du Lịch</li>
                            <li className="sub-menu-item">Kỹ năng sống</li>
                            <li className="sub-menu-item">
                                Văn hóa - Nghệ thu
                            </li>
                        </ul>
                    </li>
                </ul> */}

                <Search className="search" />
            </div>
        </div>
    );
}

export default Header;
