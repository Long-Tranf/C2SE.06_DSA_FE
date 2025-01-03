import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banner.css';

function Banner() {
    const [banners, setBanners] = useState({
        banner1: null,
        banner2: null,
        banner3: null,
    });

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8000/api/banners/top',
                );
                console.log(response);

                const filteredBanners = response.data.data
                    .filter((banner) => banner.priority > 0)
                    .sort((a, b) => a.priority - b.priority);

                setBanners({
                    banner1: filteredBanners[0] || null,
                    banner2: filteredBanners[1] || null,
                    banner3: filteredBanners[2] || null,
                });
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    console.log(banners);

    return (
        <div className="banner-container">
            {banners.banner1 && (
                <div className="banner banner-large">
                    <img src={banners.banner1.image} alt="Banner 1" />
                </div>
            )}
            <div className="inner-banner">
                {banners.banner2 && (
                    <div className="banner banner-small">
                        <img src={banners.banner2.image} alt="Banner 2" />
                    </div>
                )}
                {banners.banner3 && (
                    <div className="banner banner-small">
                        <img src={banners.banner3.image} alt="Banner 3" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Banner;
