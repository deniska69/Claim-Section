import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="d-none d-xl-block">
      <div className="container-fluid d-none d-lg-block" id="footer">
        <div className="row align-items-center">
          <div className="col" id="footer_text">
            © ООО "Водоканал"
          </div>
        </div>
      </div>
      <div className="container-fluid fixed-bottom d-lg-none" id="footer">
        <div className="row align-items-center">
          <div className="col" id="footer_text">
            © ООО "Водоканал"
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
