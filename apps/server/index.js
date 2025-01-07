import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
app.use(cors());

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    mathods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log('here data >>', data)
    console.log(`${socket.id}가 ${data.room} 방에 참가했습니다.`);
    socket.join(data.room);
  });

  socket.on('send_message', ({room, message}) => {
    console.log('here room >>', room)
    console.log('here message >>', message)

    io.to(room).emit('receive_message', message);
    // socket.broadcast.emit("receive_message", message); // 나 제외 모두
    // io.emit('receive_message',  message ); // 나 포함 모두
  });

  socket.on('connect_error', (error) => {
    console.error('Connection failed:', error);
  });
  
});
