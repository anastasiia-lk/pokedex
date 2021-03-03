import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

//Pages
//import Homepage from './pages/Homepage';
import Homepage from '../src/pages/Homepage';
import PokemonPage from '../src/pages/PokemonPage';

import Header from '../src/components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/pokemon/:id" component={PokemonPage}></Route>
      </Container>
    </Router>
  );
}

export default App;
