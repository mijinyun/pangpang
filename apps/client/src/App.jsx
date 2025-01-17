import './App.css'
import MoleGame from './components/moleGame';
// import MoleClassGame from './pages/moleClassGame';
import Message from './pages/message';
import { Link, Route, Routes } from 'react-router-dom';
import Room from './pages/room';
import InRoom from './pages/InRoom';
import SignUp from './pages/signup';
import { SocketProvider } from './lib/socketcontext';

function App() {

  return (
    <SocketProvider>
      <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/message">message</Link>
        {/* <Link to="/moleGame">molegame</Link> */}
        <Link to="/room">대기실</Link>
        <Link to ="/signup">회원가입</Link>
        {/* <Link to="/moleClassGame">moleclassgame</Link> */}
      </nav>
      <Routes>
        {/* <Route path="/moleGame" element={<MoleGame />} /> */}
        {/* <Route path="/moleClassGame" element={<MoleClassGame />} /> */}
        <Route path="/message" element={<Message />} />
        <Route path="/room" element={<Room />} />
        <Route path="/room/:id" element={<InRoom />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </SocketProvider>
  )
}

export default App
