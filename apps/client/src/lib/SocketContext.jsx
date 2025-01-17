// SocketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

// socket 인스턴스를 사용할 수 있게 해주는 커스텀 훅
export const useSocket = () => {
  return useContext(SocketContext);
};

// app 전체에서 사용하기 위한 Provider
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 서버와 연결
    const socketConnection = io('http://localhost:3001'); // 서버 URL을 실제 서버 주소로 변경
    setSocket(socketConnection);

    // 컴포넌트가 unmount될 때 연결 해제
    return () => socketConnection.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
