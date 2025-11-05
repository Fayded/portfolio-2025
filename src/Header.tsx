import profile from './assets/profile.png';
import Logo from './Logo';

function Header() {
  return (
    <header className="container-fluid">
      <div className="grid">
        <div className="col-6 col-start-2 col-end-8 profile">
          <img src={profile} alt="Profile" />
        </div>
        <Logo />
      </div>
    </header>
  );
}

export default Header;
