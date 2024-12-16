import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostItem({ data }) {
    return (
        <Link to={`/post/${data.id}`} className={cx('wrapper')}>
            <div className={cx('info')}>
                <h4 className={cx('title')}>{data.title}</h4>
            </div>
        </Link>
    );
}

export default PostItem;
