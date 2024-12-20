import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function EventManagement() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        organizer_id: '',
        association_name: '',
        image: '',
        content: '',
        event_date: '',
        end_date: '',
        location: '',
        status: '',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const isMaster = JSON.parse(localStorage.getItem('isMaster'));

                let apiUrl = '';

                if (isMaster === 0) {
                    const memberId = JSON.parse(
                        localStorage.getItem('id_user'),
                    );
                    apiUrl = `http://127.0.0.1:8000/api/events/organizer/${memberId}`;
                } else if (isMaster === 1) {
                    apiUrl = 'http://127.0.0.1:8000/api/Events/data';
                }

                const response = await axios.get(apiUrl);
                console.log(response);
                if (isMaster === 0) {
                    const fetchedEvents = response.data.map((event) => ({
                        id: event.id,
                        title: event.title,
                        organizer_id: event.association.id,
                        association_name: event.association.registrant_name,
                        image: event.image,
                        content: event.content,
                        event_date: event.event_date.split(' ')[0],
                        end_date: event.end_date.split(' ')[0],
                        status: event.status,
                    }));
                    setEvents(fetchedEvents);
                } else if (isMaster === 1) {
                    const fetchedEvents = response.data.events.map((event) => ({
                        id: event.id,
                        title: event.title,
                        organizer_id: event.association.id,
                        association_name: event.association.registrant_name,
                        image: event.image,
                        content: event.content,
                        event_date: event.event_date.split(' ')[0],
                        end_date: event.end_date.split(' ')[0],
                        status: event.status,
                    }));
                    setEvents(fetchedEvents);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const openEditModal = (event) => {
        setCurrentEvent(event);
        setFormData({ ...event });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentEvent(null);
        setFormData({
            title: '',
            organizer_id: Number(localStorage.getItem('id_user')),
            association_name: localStorage.getItem('full_name'),
            image: '',
            content: '',
            event_date: '',
            end_date: '',
            location: '',
            status: '',
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentEvent(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value === 'active' ? 'active' : 'inactive',
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prevState) => ({
                ...prevState,
                image: imageUrl,
            }));
        }
    };

    const handleUpdateEvent = async () => {
        try {
            const response = await axios.put(
                'http://127.0.0.1:8000/api/Events/update',
                formData,
            );
            setEvents(
                events.map((event) =>
                    event.id === currentEvent.id
                        ? { ...event, ...formData }
                        : event,
                ),
            );
            closeModal();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleAddEvent = async () => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/Events/create',
                formData,
            );
            const newEvent = { ...formData, id: response.data.id };
            setEvents([...events, newEvent]);
            closeModal();
        } catch (error) {
            console.error('Có lỗi xảy ra khi lưu bài viết:', error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert('Không thể lưu bài viết. Vui lòng thử lại!');
            }
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/Events/delete${id}`);
            setEvents(events.filter((event) => event.id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(events.length / eventsPerPage);

    return (
        <div className="event-management">
            <h2 className="title-event">Quản lý Sự kiện</h2>
            <button
                onClick={openAddModal}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Thêm Mới Sự Kiện
            </button>
            <table className="event-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sự kiện</th>
                        <th>Tên hội viên</th>
                        <th>Hình ảnh</th>
                        <th>Nội dung</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEvents.map((event) => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td className="title-column">{event.title}</td>
                            <td>{event.association_name}</td>
                            <td>
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    width="50"
                                />
                            </td>
                            <td>{event.content}</td>
                            <td>{event.event_date}</td>
                            <td>{event.end_date}</td>
                            <td>
                                {event.status === 'active'
                                    ? 'Hoạt động'
                                    : 'Không hoạt động'}
                            </td>
                            <td>
                                <button
                                    onClick={() => openEditModal(event)}
                                    className="btn btn-warning mr-2"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => handleDeleteEvent(event.id)}
                                    className="btn btn-danger"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav
                aria-label="Page navigation example"
                className="d-flex justify-content-center mt-3"
            >
                <ul className="pagination">
                    <li
                        className={`page-item ${
                            currentPage === 1 && 'disabled'
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${
                                currentPage === index + 1 ? 'active' : ''
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li
                        className={`page-item ${
                            currentPage === totalPages && 'disabled'
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>
                            {currentEvent
                                ? 'Chỉnh sửa Sự kiện'
                                : 'Thêm mới Sự kiện'}
                        </h3>
                        <div className="form-group">
                            <label>Tên sự kiện</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                            {errors.title && (
                                <p className="error-message">
                                    {errors.title[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Tên hội viên</label>
                            <label>{formData.association_name}</label>
                        </div>
                        <div className="form-group">
                            <label>Hình ảnh</label>
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        {formData.image && (
                            <div className="form-group mt-2">
                                <img
                                    src={formData.image}
                                    alt="Current Event"
                                    width="100"
                                    height="100"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Nội dung</label>
                            <textarea
                                className="form-control"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                            />
                            {errors.content && (
                                <p className="error-message">
                                    {errors.content[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Ngày bắt đầu</label>
                            <input
                                type="date"
                                className="form-control"
                                name="event_date"
                                value={formData.event_date}
                                onChange={handleInputChange}
                            />
                            {errors.event_date && (
                                <p className="error-message">
                                    {errors.event_date[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Ngày kết thúc</label>
                            <input
                                type="date"
                                className="form-control"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                            />
                            {errors.end_date && (
                                <p className="error-message">
                                    {errors.end_date[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Địa điểm</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                            {errors.location && (
                                <p className="error-message">
                                    {errors.location[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                className="form-control"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="active">Hoạt động</option>
                                <option value="inactive">
                                    Không hoạt động
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <button
                                type="button"
                                onClick={
                                    currentEvent
                                        ? handleUpdateEvent
                                        : handleAddEvent
                                }
                                className="btn btn-primary"
                            >
                                {currentEvent ? 'Cập nhật' : 'Thêm mới'}
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="btn btn-secondary ml-2"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventManagement;
