import classNames from 'classnames/bind';
import styles from './AssociationItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AssociationItem({ data }) {
    return (
        <Link to={`/association/${data.id}`} className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('avatar')}>
                    <img src={data.avatar} alt={data.company_name} />
                </div>
                <h4 className={cx('name')}>{data.company_name}</h4>
            </div>
        </Link>
    );
}

export default AssociationItem;
