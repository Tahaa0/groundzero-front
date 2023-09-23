import { useTranslation } from 'react-i18next';
import SocialLink from './SocialLink';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer">
        <div className="container text-center d-flex justify-content-center align-items-center h-50">
          <div className="w-50">
            <div>
              {`${t('Thanks to the contributors Ahmed, Adib, Mouad')}....`}
              <br />
              {t('Contact')}
              <a
                className="text-white contact-email"
                href="mailto:sami.mersel@gmail.com"
              >
                sami.mersel@gmail.com
              </a>
              <br />
              <br />
              <p>Proudly Open Source</p>
              <div className="d-flex justify-content-center align-items-center">
                <ul className="social-list d-flex gap-4">
                  <SocialLink
                    iconClass="fa-brands fa-instagram"
                    url="https://instagram.com/groundzeromaroc?igshid=NGVhN2U2NjQ0Yg=="
                  />
                  <SocialLink
                    iconClass="fa-brands fa-github"
                    url="https://github.com/Tahaa0/groundzero-front"
                  />
                  <SocialLink
                    iconClass="fa-brands fa-twitter"
                    url="https://twitter.com/groundzeroma?t=d_LX8KXOKWwFZ2JPdqRvbg&s=09"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
