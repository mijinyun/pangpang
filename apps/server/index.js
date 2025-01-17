import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import "dotenv/config";
import authRoutes from './lib/auth/routes.js';
import { getWebAuthnOptions, postWebAuthnRegister } from './lib/auth/webauthn.js';

const app = express();
const server = createServer(app);
app.use(cors());
app.use('/auth', authRoutes);

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('auth-webauthn-register-options', async (data) => {
    console.log(`${socket.id}가 ${data.email}로 회원가입을 시도합니다.`);

    const options = await getWebAuthnOptions(data.email,socket)

    io.emit('auth-webauthn-register-options-response', options);
  });

  socket.on('auth-webauthn-register', async (data) => {
    // console.log('here data >>', data)
    const result = await postWebAuthnRegister(data,socket)
    console.log('result >> ', result)
  })

  
//   socket.on("join_room", (data) => {
//     console.log('here data >>', data)
//     console.log(`${socket.id}가 ${data.room} 방에 참가했습니다.`);
//     socket.join(data.room);
//   });

//   socket.on('send_message', ({room, message}) => {
//     console.log('here room >>', room)
//     console.log('here message >>', message)

//     io.to(room).emit('receive_message', message);
//     // socket.broadcast.emit("receive_message", message); // 나 제외 모두
//     // io.emit('receive_message',  message ); // 나 포함 모두
//   });

//   socket.on('connect_error', (error) => {
//     console.error('Connection failed:', error);
//   });
  
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });