import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './footer.css';
import './grid.css';

function Footer() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tracking, setTracking] = useState('');

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/Categories/data')
            .then((response) => {
                setCategories(response.data.categories);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                setLoading(false);
            });

        axios
            .get('http://127.0.0.1:8000/api/tracking/latest')
            .then((response) => {
                setTracking(response.data.visit_count);
            })
            .catch((error) => {
                console.error('Error fetching tracking:', error);
            });
    }, []);

    const categorizedData = categories.reduce((acc, category) => {
        if (category.parent_category_id === 0) {
            acc[category.category_name] = [];
        } else {
            const parentCategoryName = categories.find(
                (c) => c.id === category.parent_category_id,
            )?.category_name;
            if (parentCategoryName) {
                acc[parentCategoryName].push(category);
            }
        }
        return acc;
    }, {});

    return (
        <footer className="footer">
            <div className="grid wide footer__content">
                <div className="row">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        Object.keys(categorizedData).map((categoryName) => (
                            <div
                                key={categoryName}
                                className="col l-2-4 m-6 c-6"
                            >
                                <h3 className="footer__heading">
                                    {categoryName}
                                </h3>
                                <ul className="footer-list">
                                    {categorizedData[categoryName].map(
                                        (category) => (
                                            <li
                                                key={category.id}
                                                className="footer-item"
                                            >
                                                <Link
                                                    to={`/category/${category.id}`}
                                                    className="footer-item__link"
                                                >
                                                    {category.category_name}
                                                </Link>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        ))
                    )}
                    <div className="col l-2-4 m-6 c-6">
                        <h3 className="footer__heading">Dành Cho Hội Viên</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <Link
                                    to={`/event`}
                                    className="footer-item__link"
                                >
                                    Sự Kiện
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link
                                    to={`/library`}
                                    className="footer-item__link"
                                >
                                    Thư Viện
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div className="tracking">
                <h4>Lượt truy cập hôm nay: {tracking}</h4>
            </div> */}
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
