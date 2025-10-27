import profile from './assets/profile.png'
import Logo from './Logo';

function Header() {
  return ( 
    <header className="container">
      <div className="grid">
        <div className="col-8 profile">
          <img src={profile} alt="Profile" />
        </div>
        <Logo />
      </div>
    </header>
  );
}

export default Header;