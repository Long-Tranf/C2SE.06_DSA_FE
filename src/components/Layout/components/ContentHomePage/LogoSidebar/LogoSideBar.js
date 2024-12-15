import './logoSidebar.css';

const LogoSidebar = ({ avatar }) => {
    return (
        <div className="imgLogoSidebar">
            <img src={avatar} alt="" />
        </div>
    );
};

export default LogoSidebar;
