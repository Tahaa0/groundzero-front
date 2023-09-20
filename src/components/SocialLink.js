const SocialLink = ({ iconClass, url }) => {
  return (
    <li>
      <a className="social-link" href={url} target="blank">
        <i className={`social-icon-font ${iconClass}`}></i>
      </a>
    </li>
  );
};

export default SocialLink;
