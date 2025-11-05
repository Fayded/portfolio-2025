import Header from './Header';
import Intro from './Intro';
import Marks from './Marks';
import Work from './Work';
import './styles/App.css';

function App() {
  return (
    <>
      <section className="splash">
        <Header />
        <Intro />
      </section>
      <Marks />
      <Work />
    </>
  );
}

export default App;
