import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GamePage from './components/GamePage';
import Home from './components/Home';
import Results from './components/Results';
import Scoreboard from './components/Scoreboard';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<GamePage />}/>
          <Route path='/results' element={<Results />} />
          <Route path='/scoreboard' element={<Scoreboard />} />
          <Route path='*' element="Essa página não existe." />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
