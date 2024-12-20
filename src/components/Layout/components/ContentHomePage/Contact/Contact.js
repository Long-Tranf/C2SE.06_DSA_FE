import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Contact.css';
import {
    faEnvelope,
    faLocationDot,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    const [formData, setFormData] = useState({
        title: '',
        sender_name: '',
        email_sender: '',
        content: '',
        status: 'pending',
    });

    const [errors, setErrors] = useState({});
    //const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const { title, content, sender_name, email_sender, status } = formData;
        setErrors({});
        //setStatusMessage('');

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/Contact/create',
                {
                    title,
                    content,
                    sender_name,
                    email_sender,
                    status: 'pending',
                },
            );
            console.log('Response:', response.data);
            alert('Gửi liên hệ thành công!');
            setFormData({
                title: '',
                sender_name: '',
                email_sender: '',
                content: '',
                status: 'pending',
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại.');
                console.error('Error:', error.response?.data || error.message);
            }
        }
    };

    return (
        <div className="contact">
            <div className="grid wide">
                <div className="innerContact">
                    <h1 className="headingContact">LIÊN HỆ VỚI CHÚNG TÔI</h1>
                    <div className="wrappInputContact">
                        <div className="contactLeft">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Tiêu đề"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="inputContact"
                                />
                                {errors.title && (
                                    <p className="error">{errors.title[0]}</p>
                                )}
                            </div>
                            <div className="boxInputContact">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Tên của bạn"
                                        name="sender_name"
                                        value={formData.sender_name}
                                        onChange={handleChange}
                                        className="inputContact"
                                    />
                                    {errors.sender_name && (
                                        <p className="error">
                                            {errors.sender_name[0]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Email của bạn"
                                        name="email_sender"
                                        value={formData.email_sender}
                                        onChange={handleChange}
                                        className="inputContact"
                                    />
                                    {errors.email_sender && (
                                        <p className="error">
                                            {errors.email_sender[0]}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <textarea
                                    placeholder="Nội dung"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="textareaContact"
                                ></textarea>
                                {errors.content && (
                                    <p className="error">{errors.content[0]}</p>
                                )}
                            </div>
                            <button
                                className="btnContact"
                                onClick={handleSubmit}
                            >
                                GỬI
                            </button>
                            {/* {statusMessage && (
                                <p className="statusMessage">{statusMessage}</p>
                            )} */}
                        </div>
                        <div className="contactRight">
                            <p className="contactRight-title">
                                Hiệp hội doanh nghiệp phần mềm Đà Nẵng
                            </p>
                            <div className="wrappInfoContact">
                                <div className="contactRight-icon">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <div className="contactRight-address">
                                    <p>
                                        Tầng 4 tòa nhà công viên phần mềm Đà
                                        Nẵng
                                    </p>
                                    <p>02 Quang Trung</p>
                                    <p>Quận Hải Châu</p>
                                    <p>TP Đà Nẵng</p>
                                </div>
                            </div>
                            <div className="wrappInfoContact">
                                <div className="contactRight-icon">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <p>02363 888 665</p>
                            </div>
                            <div className="wrappInfoContact">
                                <div className="contactRight-icon">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <p>contact@dsa.org.vn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
