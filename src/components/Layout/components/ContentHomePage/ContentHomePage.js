import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './contentHomePage.css';
import LogoSidebar from './LogoSidebar/LogoSideBar';
import NewSidebar from './NewSidebar/NewSidebar';
import NewsMain from './NewsMain/NewsMain';
import NewsLayout from './NewsLayout/NewsLayout';
import Contact from './Contact/Contact';

const ContentHomePage = () => {
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/associations/avatars')
            .then((response) => {
                setAvatars(response.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách avatars:', error);
            });
    }, []);

    return (
        <div className="contentHomePage">
            <div className="grid wide">
                <div className="news">
                    <div className="newsMain">
                        <NewsMain />
                        <NewsLayout
                            apiUrl="http://127.0.0.1:8000/api/posts/latest/12"
                            title="Sự Kiện"
                        />
                        <NewsLayout
                            apiUrl="http://127.0.0.1:8000/api/posts/latest/1"
                            title="Sự Kiện"
                        />
                    </div>
                    <div className="wrappRight">
                        <div className="newSidebar">
                            <NewSidebar
                                title="Bài Viết Mới nhất"
                                apiUrl="http://127.0.0.1:8000/api/posts/latest/12"
                            />
                            <NewSidebar
                                title="Bài Viết Mới nhất"
                                apiUrl="http://127.0.0.1:8000/api/posts/latest/1"
                            />
                        </div>
                        <div className="logoSidebar">
                            {avatars.map((item) => (
                                <LogoSidebar
                                    key={item.id}
                                    id={item.id}
                                    avatar={item.avatar}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <Contact />
                </div>
            </div>
        </div>
    );
};

export default ContentHomePage;
