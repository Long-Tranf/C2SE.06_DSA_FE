import '~/pages/Admin/Statistics/Statistics.css';

function Statitics() {
    return (
        <div className="statistic-container">
            <h1 className="statistic-heading">Tổng Quan</h1>
            <div className="statistic-content">
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Lượt Truy Cập Hôm Nay
                    </h2>
                    <h1 className="statistic-content-item-desc">300</h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Bài Viết
                    </h2>
                    <h1 className="statistic-content-item-desc">300</h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Member
                    </h2>
                    <h1 className="statistic-content-item-desc">300</h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Hiệp Hội
                    </h2>
                    <h1 className="statistic-content-item-desc">300</h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Sự Kiện
                    </h2>
                    <h1 className="statistic-content-item-desc">300</h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Phản Hồi Hôm Nay
                    </h2>
                    <h1 className="statistic-content-item-desc">300</h1>
                </div>
            </div>
        </div>
    );
}

export default Statitics;
