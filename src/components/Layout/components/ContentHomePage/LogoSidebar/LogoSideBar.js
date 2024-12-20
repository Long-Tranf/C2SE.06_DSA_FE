import './logoSidebar.css';
import { useNavigate } from 'react-router-dom';

const LogoSidebar = ({ id, avatar }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/association/${id}`);
    };
    return (
        <div className="imgLogoSidebar" onClick={handleClick}>
            <img src={avatar} alt="" />
        </div>
    );
};

export default LogoSidebar;
