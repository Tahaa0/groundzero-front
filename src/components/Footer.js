import '../style/global.css';
import { MA,SY,PS,FR } from 'country-flag-icons/react/3x2'

const Footer = () => {
    return(
            <footer className="footer">
                Thanks to Alae Tamouh <MA title="Morocco" className="flag"/>, Mohamed <MA title="Morocco" className="flag"/>,
                Saleh Hussain <PS title="Palestine" className="flag"/>, Adib zouiten <MA title="Morocco" className="flag"/>,
                Ahmed Alashraf <SY title="Syria" className="flag"/>, Sami Mersel <FR title="France" className="flag"/>,
                Taha Boudouma <MA title="Morocco" className="flag"/>, Mouad Zizi <MA title="Morocco" className="flag"/>, Anas Dandashi <SY title="Syria" className="flag"/> for their contribution.
            </footer>
    )
}

export default Footer;