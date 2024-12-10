import React, { useState } from 'react';
import './EventManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function EventManagement() {
    const [events, setEvents] = useState([
        {
            id: 1,
            eventName: 'Event A',
            memberName: 'Member A',
            image: 'image-a.jpg',
            content: 'Content of Event A',
            startDate: '2024-12-01',
            endDate: '2024-12-05',
            status: true,
        },
        {
            id: 2,
            eventName: 'Event B',
            memberName: 'Member B',
            image: 'image-b.jpg',
            content: 'Content of Event B',
            startDate: '2024-12-10',
            endDate: '2024-12-15',
            status: false,
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [formData, setFormData] = useState({
        eventName: '',
        memberName: '',
        image: '',
        content: '',
        startDate: '',
        endDate: '',
        status: true,
    });

    const openEditModal = (event) => {
        setCurrentEvent(event);
        setFormData({ ...event });
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentEvent(null);
        setFormData({
            eventName: '',
            memberName: '',
            image: '',
            content: '',
            startDate: '',
            endDate: '',
            status: true,
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
                [name]: value === 'true',
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Lấy file đã chọn
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Tạo URL tạm
            setFormData((prevState) => ({
                ...prevState,
                image: imageUrl, // Lưu URL vào formData
            }));
        }
    };

    const handleUpdateEvent = () => {
        setEvents(
            events.map((event) =>
                event.id === currentEvent.id
                    ? { ...event, ...formData }
                    : event,
            ),
        );
        closeModal();
    };

    const handleAddEvent = () => {
        const newEvent = {
            id: events.length + 1,
            ...formData,
        };
        setEvents([...events, newEvent]);
        closeModal();
    };

    const handleDeleteEvent = (id) => {
        const newEvents = events.filter((event) => event.id !== id);
        setEvents(newEvents);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="event-management">
            <h2 className="title-event">Quản lý Sự kiện</h2>
            <button
                onClick={openAddModal}
                className="btn btn-success mb-3"
                style={{ float: 'right' }}
            >
                Add New
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
                            <td className="title-column">{event.eventName}</td>
                            <td>{event.memberName}</td>
                            <td>
                                <img
                                    src={event.image}
                                    alt={event.eventName}
                                    width="50"
                                />
                            </td>
                            <td>{event.content}</td>
                            <td>{event.startDate}</td>
                            <td>{event.endDate}</td>
                            <td>
                                {event.status ? 'Hoạt động' : 'Không hoạt động'}
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
                            onClick={() => handlePageChange(currentPage - 1)}
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
                                onClick={() => handlePageChange(index + 1)}
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
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Modal chỉnh sửa */}
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
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tên hội viên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="memberName"
                                value={formData.memberName}
                                onChange={handleInputChange}
                            />
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

                        {/* Hiển thị hình ảnh nếu có */}
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
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Ngày bắt đầu</label>
                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày kết thúc</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                className="form-control"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value={true}>Hoạt động</option>
                                <option value={false}>Không hoạt động</option>
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button
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
                                onClick={closeModal}
                                className="btn btn-secondary ml-2"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventManagement;
