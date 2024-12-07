import './contentHomePage.css';
import LogoSidebar from './LogoSidebar/LogoSideBar';
import NewSidebar from './NewSidebar/NewSidebar';
import NewsMain from './NewsMain/NewsMain';
import NewsLayout from './NewsLayout/NewsLayout';

const ContentHomePage = () => {
    return (
        <div className="contentHomePage">
            <div className="grid wide">
                <div className="news">
                    <div className="newsMain">
                        <NewsMain />
                        <NewsLayout />
                        <NewsLayout />
                    </div>
                    <div className="newSidebar">
                        <NewSidebar />
                        <NewSidebar />
                    </div>
                    <div className="logoSidebar">
                        <LogoSidebar />
                        <LogoSidebar />
                        <LogoSidebar />
                        <LogoSidebar />
                        <LogoSidebar />
                        <LogoSidebar />
                        <LogoSidebar />
                        <LogoSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentHomePage;
