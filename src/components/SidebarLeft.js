import { Link } from 'react-router-dom';
import '../style/global.css';
import logoImg from '../assets/images/logo.png';

const SidebarLeft = () => {
  return (
    <Link to="/">
      <img className="logo-img" src={logoImg} alt="logo" />
    </Link>
  );
};

export default SidebarLeft;
