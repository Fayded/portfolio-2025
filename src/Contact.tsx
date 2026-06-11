import flagUsa from './assets/flag-usa.svg';
import './styles/contact.scss';

function Contact() {
  return (
    <footer className="container footer">
      <div className="grid my-2">
        <div className="location">
          <p>United States of America</p>
          <p className="location">
            <span>Atlanta Georgia</span>
          </p>
        </div>
        <img src={flagUsa} alt="USA Flag" className="flag" />
      </div>
      <div className="grid mt-2">
        <h2 className="name">FAYCO</h2>
      </div>
      <div className="grid my-2">
        <div className="email">
          <span>WWW.</span>
          <span className="separator">/</span>
          <span>HALO @</span>
        </div>
        <div className="website">
          <span>FAYCO.IO</span>
        </div>
      </div>
      <div className="grid my-2">
        <div className="country-code">
          <span>+1</span>
          <span className="separator">/</span>
          <span>0</span>
        </div>
        <div className="phone">
          <span>404.433.9270</span>
        </div>
      </div>
      <div className="grid my-2 socials-hire">
        <nav className="socials">
          <a
            href="https://github.com/kevinfay"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://dribbble.com/kevinfay"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dribbble
          </a>
          <a
            href="https://linkedin.com/in/kevinfay"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linked_In
          </a>
          <a
            href="https://facebook.com/kevinfay"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com/kevinfay"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </nav>
        <div className="hire">
          <a href="mailto:halo@fayco.io">For Hire</a>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
