import './App.css'
import MoleGame from './pages/moleGame';
// import MoleClassGame from './pages/moleClassGame';
import Message from './pages/message';
import { Link, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/message">message</Link>
        <Link to="/moleGame">molegame</Link>
        {/* <Link to="/moleClassGame">moleclassgame</Link> */}
      </nav>
      <Routes>
        <Route path="/moleGame" element={<MoleGame />} />
        {/* <Route path="/moleClassGame" element={<MoleClassGame />} /> */}
        <Route path="/message" element={<Message />} />
      </Routes>
    </>
  )
}

export default App
