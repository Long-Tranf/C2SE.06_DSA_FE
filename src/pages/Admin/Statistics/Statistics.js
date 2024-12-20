import '~/pages/Admin/Statistics/Statistics.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Statitics() {
    const [totalUser, setTotalUsers] = useState();
    const [totalPost, setTotalPosts] = useState();
    const [totalEvent, setTotalEvents] = useState();
    const [totalContact, setTotalContacts] = useState();

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const usersResponse = await axios.get(
                    'http://127.0.0.1:8000/api/members/total',
                );
                setTotalUsers(usersResponse.data.total_members);
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
                console.log(contactResponse);
                setTotalContacts(contactResponse.data.total_contacts_today);
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
                        Lượt Truy Cập Hôm Nay
                    </h2>
                    <h1 className="statistic-content-item-desc">300</h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Bài Viết
                    </h2>
                    <h1 className="statistic-content-item-desc">{totalPost}</h1>
                </div>
                <div className="statistic-content-item">
                    <h2 className="statistic-content-item-title">
                        Tổng Member
                    </h2>
                    <h1 className="statistic-content-item-desc">{totalUser}</h1>
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
