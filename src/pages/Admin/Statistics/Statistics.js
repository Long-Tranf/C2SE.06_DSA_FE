import '~/pages/Admin/Statistics/Statistics.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Statitics() {
    const [totalTracking, setTotalTracking] = useState();
    const [todayTracking, setTodayTracking] = useState();

    //const [totalUser, setTotalUsers] = useState();
    const [totalPost, setTotalPosts] = useState();
    const [totalEvent, setTotalEvents] = useState();
    const [totalContact, setTotalContacts] = useState();
    const [totalAssociation, setTotalAssociations] = useState();

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                // const usersResponse = await axios.get(
                //     'http://127.0.0.1:8000/api/members/total',
                // );
                //setTotalUsers(usersResponse.data.total_members);
                const postsResponse = await axios.get(
                    'http://127.0.0.1:8000/api/posts/total',
                );
                setTotalPosts(postsResponse.data.total_posts);

                const eventsResponse = await axios.get(
                    'http://127.0.0.1:8000/api/Events/total',
                );
                setTotalEvents(eventsResponse.data.total_events);

                const contactResponse = await axios.get(
                    'http://127.0.0.1:8000/api/Contacts/totaltoday',
                );
                setTotalContacts(contactResponse.data.total_contacts_today);

                const associationsResponse = await axios.get(
                    'http://127.0.0.1:8000/api/Associations-total',
                );
                setTotalAssociations(
                    associationsResponse.data.total_associations,
                );

                const trackingReponse = await axios.get(
                    'http://127.0.0.1:8000/api/tracking',
                );
                setTotalTracking(trackingReponse.data.total_visit_count);

                const trackingTodayResponse = await axios.get(
                    'http://127.0.0.1:8000/api/tracking/latest',
                );
                setTodayTracking(trackingTodayResponse.data.visit_count);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchTotals();
    }, []);

    return (
        <div className="statistic-container">
            <h1 className="statistic-heading">Tổng Quan</h1>
            <div className="statistic-content">
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Lượt Truy Cập
                    </h2>
                    <h1 className="statistic-content-item-desc">
                        {totalTracking}
                    </h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Lượt Truy Cập Trong Ngày
                    </h2>
                    <h1 className="statistic-content-item-desc">
                        {todayTracking}
                    </h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Bài Viết
                    </h2>
                    <h1 className="statistic-content-item-desc">{totalPost}</h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Hiệp Hội
                    </h2>
                    <h1 className="statistic-content-item-desc">
                        {totalAssociation}
                    </h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Sự Kiện
                    </h2>
                    <h1 className="statistic-content-item-desc">
                        {totalEvent}
                    </h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Phản Hồi Hôm Nay
                    </h2>
                    <h1 className="statistic-content-item-desc">
                        {totalContact}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Statitics;
