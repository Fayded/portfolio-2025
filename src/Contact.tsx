import './styles/contact.css';

function Contact() {
  return (
    <footer className="container-fluid contact">
      <div className="contact-header">
        <div>
          <h2>React out</h2>
          <p>404.433.9270</p>
        </div>
        <div className="hire">
          <a href="#">Hire Me</a>
        </div>
      </div>
      <a href="#" className="email">
        <span>
          HALO<span>FAYCO.COM</span>
        </span>
        <span className="contact-at">AT</span>
      </a>
    </footer>
  );
}

export default Contact;
