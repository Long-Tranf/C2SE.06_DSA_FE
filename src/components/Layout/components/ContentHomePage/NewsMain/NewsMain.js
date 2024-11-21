import "./newsMain.css";
import { Link } from "react-router-dom";

const NewsMain = () => {
  return (
    <div className="innerNewMain">
      <div className="imageNewMain">
        <img
          src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
          alt=""
        />
      </div>
      <div className="boxNewsMain">
        <h3 className="headingNewMain">
          <Link to="/newdetail" className="heading-link">
            Hội thảo quốc tế ARTDO lần đầu đến Việt Nam: Bàn sâu về lãnh đạo kỹ
            thuật số và văn hóa huấn luyện
          </Link>

        </h3>
        <span className="dateNewMain">date</span>
        <p className="descNewMain">
          Hiệp hội Doanh nghiệp Phần mềm Đà NẵngĐào tạoHội thảo quốc tế ARTDO
          lần đầu đến Việt Nam: Bàn sâu về lãnh đạo kỹ thuật số và văn hóa huấn
          luyện Hội thảo quốc tế ARTDO lần đầu đến Việt Nam: Bàn sâu về lãnh đạo
          kỹ thuật số và văn hóa huấn luyện...
        </p>
      </div>
    </div>
  );
};

export default NewsMain;