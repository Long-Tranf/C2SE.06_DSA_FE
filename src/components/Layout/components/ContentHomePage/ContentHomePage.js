import "./contentHomePage.css";
import LogoSidebar from "./LogoSidebar/LogoSideBar";
import NewSidebar from "./NewSidebar/NewSidebar";
import NewsMain from "./NewsMain/NewsMain";

const ContentHomePage = () => {
    return (
        <div className="contentHomePage">
            <div className="grid wide">
                <div className="news">
                    <div className="newsMain">
                        <NewsMain />
                        <NewsMain />
                        <NewsMain />
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