import { Link } from 'react-router-dom';
import './Breadcrumb.css';

function Breadcrumb({ items }) {
    return (
        <nav
            style={{ '--bs-breadcrumb-divider': "'>'" }}
            aria-label="breadcrumb"
        >
            <ol className="breadcrumb breadcrumb-content">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`breadcrumb-item ${
                            item.active ? 'active' : ''
                        }`}
                        aria-current={item.active ? 'page' : undefined}
                    >
                        {item.active ? (
                            item.name
                        ) : (
                            <Link to={item.link}>{item.name}</Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
