import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Chat from './components/chat/Chat';
import io from 'socket.io-client';

const serverUrl = 'https://chat-app-server-alpha.vercel.app/';
const socket = io.connect(serverUrl);

function App() {
  const [info, setInfo] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} info={info} setInfo={setInfo} />} />
        <Route path="/chat" element={<Chat socket={socket} info={info} setInfo={setInfo} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
