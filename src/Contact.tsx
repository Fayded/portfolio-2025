import at from './assets/at.svg';
import './styles/contact.scss';

function Contact() {
  return (
    <footer className="container-fluid contact">
      <div className="contact-header">
        <div>
          <h2>React out</h2>
          <p className="smaller">404.433.9270</p>
        </div>
        <div className="hire">
          <a href="#">Hire Me</a>
        </div>
      </div>
      <a href="#" className="email">
        <span>
          HALO<span className="email-domain">FAYCO.COM</span>
        </span>
        <img src={at} alt="AT" />
      </a>
      <h2 className="secondary">Socials</h2>
      <section className="socials">
        <a href="#">Github</a>
        <a href="#">Dribble</a>
        <a href="#">Linked_In</a>
        <a href="#">Instagram</a>
      </section>
      <div className="location">
        <p>Based in Atlanta, Georgia</p>
        <p>United States of America</p>
      </div>
    </footer>
  );
}

export default Contact;
