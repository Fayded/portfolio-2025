import Splash from './Splash';
import History from './History';
import WhoWeAre from './WhoWeAre';
// import Marks from './Marks';
import Work from './Work';
import About from './About';
import Contact from './Contact';
import './styles/App.scss';

function App() {
  return (
    <>
      <Splash />
      <About />
      <Work />
      <WhoWeAre />
      {/* <Marks /> */}
      <Contact />
      <History />
    </>
  );
}

export default App;
