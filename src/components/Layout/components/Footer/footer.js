import './footer.css';
import './grid.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="grid wide footer__content">
                <div className="row">
                    <div className="col l-2-4 m-6 c-6">
                        <h3 className="footer__heading">Sự Kiện</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Tài nguyên – Chính sách mới
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Từ suy nghĩ đến bàn phím
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Chia sẻ giải pháp, thành tựu
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-2-4 m-6 c-6">
                        <h3 className="footer__heading">Cộng đồng chúng ta</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Gia nhập DSA
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Nối vòng tay lớn
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Sự kiện sắp đến
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Hội viên kể chuyện
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-2-4 m-6 c-6">
                        <h3 className="footer__heading">Nguồn nhân lực it</h3>

                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Đào tạo nguồn nhân lực
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Tuyển dụng
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-2-4 m-6 c-6">
                        <h3 className="footer__heading">Góc Nhìn DSA</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Đà Nẵng 24h
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Kỹ năng sống
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Du lịch
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    Văn hóa – Nghệ thuật
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="tracking"></div>
            <div className="footer__bottom">
                <div className="grid wide">
                    <p className="footer__text">
                        © 2024 - Bản quyền thuộc về DSA.ord.vn
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
