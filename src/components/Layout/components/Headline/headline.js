import Marquee from 'react-fast-marquee';
import './headline.css';

function Headline() {
    const LoadingSpinner = [
        {
            id: 1,
            title: 'Tin tức nổi bật trong ngày',
        },
        {
            id: 2,
            title: 'Tin tuyển dụng',
        },
        {
            id: 3,
            title: 'Tin tức 24h',
        },
        {
            id: 4,
            title: 'Nhịp sống Đà Nẵng',
        },
    ];

    return (
        <div className="headline-container">
            <div className="headline-left">
                <div className="headline-left-content">
                    <h2 className="headline-title">Nổi Bật</h2>
                </div>
            </div>
            <div className="headline-right">
                <div className="marquee-container">
                    <Marquee>
                        {LoadingSpinner.map((s, i) => (
                            <a key={s.id} href="#">
                                {s.title}
                            </a>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
}

export default Headline;
