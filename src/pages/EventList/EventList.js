import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '~/components/Layout/components/Footer/footer';
import Header from '~/components/Layout/components/Header/header';
import Breadcrumb from '~/components/Layout/components/Breadcrumb/Breadcumb';

import './EventList.css';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const resultsPerPage = 6;
    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'Dành cho Hội Viên', active: false },
        { name: 'Sự Kiện', active: true },
    ];

    useEffect(() => {
        const checkAccessToken = () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                fetchEvents(accessToken);
            }
            setLoading(false);
        };

        checkAccessToken();
    }, []);

    const fetchEvents = async (accessToken) => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/Events/data',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            setEvents(response.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleOpenModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = events.slice(indexOfFirstResult, indexOfLastResult);

    const accessToken = localStorage.getItem('accessToken');

    return (
        <div className="wrapper">
            <Header />
            <h2 className="event-heading">Sự Kiện Đang Diễn Ra</h2>
            <div className="breadcrumb-container">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="event-list">
                {!accessToken ? (
                    <p className="access-warning">
                        Đây là nội dung cho hội viên. Bạn cần{' '}
                        <a href="/login">đăng nhập</a> để xem sự kiện.
                    </p>
                ) : (
                    <div>
                        <div className="event-content">
                            {currentResults.map((event) => (
                                <div key={event.id} className="event-item">
                                    <img
                                        className="event-image"
                                        src={event.image}
                                        alt={event.title}
                                    />
                                    <div className="event-info">
                                        <h3
                                            className="event-title"
                                            onClick={() =>
                                                handleOpenModal(event)
                                            }
                                        >
                                            {event.title}
                                        </h3>
                                        <p className="event-meta">
                                            <strong>Thời gian:</strong>{' '}
                                            {new Date(
                                                event.event_date,
                                            ).toLocaleString()}{' '}
                                            -{' '}
                                            {new Date(
                                                event.end_date,
                                            ).toLocaleString()}
                                            <br />
                                            <strong>Địa điểm:</strong>{' '}
                                            {event.location}
                                            <br />
                                            <strong>Người tổ chức:</strong>{' '}
                                            {event.association?.company_name ||
                                                'Không rõ'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {events.length > resultsPerPage && (
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center">
                                    <li
                                        className={`page-item ${
                                            currentPage === 1 && 'disabled'
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(currentPage - 1)
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from(
                                        {
                                            length: Math.ceil(
                                                events.length / resultsPerPage,
                                            ),
                                        },
                                        (_, index) => (
                                            <li
                                                key={index + 1}
                                                className={`page-item ${
                                                    currentPage === index + 1
                                                        ? 'active'
                                                        : ''
                                                }`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            index + 1,
                                                        )
                                                    }
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ),
                                    )}
                                    <li
                                        className={`page-item ${
                                            currentPage ===
                                                Math.ceil(
                                                    events.length /
                                                        resultsPerPage,
                                                ) && 'disabled'
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
                                            }
                                            disabled={
                                                currentPage ===
                                                Math.ceil(
                                                    events.length /
                                                        resultsPerPage,
                                                )
                                            }
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                )}
            </div>
            <Footer />

            {/* Modal */}
            {isModalOpen && selectedEvent && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button
                            className="close-modal"
                            onClick={handleCloseModal}
                        >
                            X
                        </button>
                        <h3>{selectedEvent.title}</h3>
                        <img
                            className="event-image"
                            src={selectedEvent.image}
                            alt={selectedEvent.title}
                        />
                        <p>{selectedEvent.content}</p>
                        <p>
                            <strong>Thời gian:</strong>{' '}
                            {new Date(
                                selectedEvent.event_date,
                            ).toLocaleString()}{' '}
                            -{' '}
                            {new Date(selectedEvent.end_date).toLocaleString()}
                        </p>
                        <p>
                            <strong>Địa điểm:</strong> {selectedEvent.location}
                        </p>
                        <p>
                            <strong>Người tổ chức:</strong>{' '}
                            {selectedEvent.association?.company_name ||
                                'Không rõ'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventList;
