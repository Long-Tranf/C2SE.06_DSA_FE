import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ScrollToTopButton.module.scss';

const cx = classNames.bind(styles);

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Kiểm tra khi cuộn xuống điểm y > 200px thì hiện nút mũi tên lên
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Lắng nghe sự kiện cuộn trang
        window.addEventListener('scroll', handleScroll);

        // Cleanup sự kiện khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div
            className={cx('scroll-to-top', { visible: isVisible })}
            onClick={scrollToTop}
        >
            <FontAwesomeIcon icon={faArrowUp} />
        </div>
    );
}

export default ScrollToTopButton;
