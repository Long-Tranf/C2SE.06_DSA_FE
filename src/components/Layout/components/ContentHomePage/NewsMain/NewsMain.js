import './newsMain.css';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NewsMain = () => {
    const data = {
        date: '03/10/2024',
        time: '11:15',
        views: '1000',
    };

    return (
        <div className="innerNewMain">
            <div className="imageNewMain">
                <img
                    src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                    alt="Default Image"
                />
            </div>
            <div className="boxNewsMain">
                <h3 className="headingNewMain">
                    <Link to="/newdetail" className="heading-link">
                        Hội thảo quốc tế ARTDO lần đầu đến Việt Nam: Bàn sâu về
                        lãnh đạo kỹ thuật số và văn hóa huấn luyện
                    </Link>
                </h3>
                <div className="meta">
                    <span>
                        <i className="fas fa-calendar-alt"></i> {data.date}
                    </span>
                    <span>
                        <i className="fas fa-clock"></i> {data.time}
                    </span>
                    <span>
                        <i className="fas fa-eye"></i> {data.views}
                    </span>
                </div>
                <p className="descNewMain">
                    Hiệp hội Doanh nghiệp Phần mềm Đà NẵngĐào tạoHội thảo quốc
                    tế ARTDO lần đầu đến Việt Nam: Bàn sâu về lãnh đạo kỹ thuật
                    số và văn hóa huấn luyện...
                </p>
            </div>
        </div>
    );
};

export default NewsMain;
