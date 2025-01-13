import {useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const Message = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const joinRoom = (e) => {
    if(room !== ''){
      socket.emit('join_room', {room});
    }
  }

  const sendMessage = () => {
    socket.emit('send_message', {room,message});
  }

  useEffect(() => {
    socket.on("receive_message", (message) => {
      console.log('here:', message);
      setMessageReceived(message);
    });

    return () => {
      console.log('cleanup');
      socket.off('receive_message');
    };

  }, []);


  return (
    <>
    <h1>Socket.io</h1>
    <div>
      <input
        type="text"
        placeholder="Room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
    <input
        type="text"
        placeholder="메세지를 입력해주세요."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <h2>Message Received: {messageReceived}</h2>
    </>
  )
}

export default Message
