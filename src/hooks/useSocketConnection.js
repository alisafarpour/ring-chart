import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const useSocketConnection = (config = {}) => {
  const {
    url = 'wss://ws2.qxbroker.com',
    authSession = 'd0ywphfeq7EtL4x1uPoeLHNhGoQvh9araKSZIPTO',
    isDemo = 1,
    tournamentId = 0,
    autoConnect = true,
  } = config;

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);

  const connectSocket = useCallback(() => {
 
    const socketInstance = io(url, {
      transports: ['websocket'],
      upgrade: false,  
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      forceNew: true,
      query: {
        EIO: '3',
        transport: 'websocket'
      }
    });


    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
      setError(null);

      socketInstance.emit('authorization', {
        session: authSession,
        isDemo,
        tournamentId
      });
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError(err.message);
    });

    socketInstance.on('reconnect_attempt', () => {
      console.log('Attempting to reconnect...');
    });

    socketInstance.on('reconnect', () => {
      console.log('Reconnected successfully');
    });

    socketInstance.on('42', (data) => {
      if (Array.isArray(data)) {
        const [eventName, payload] = data;
        const messageData = { eventName, payload, timestamp: new Date() };
        setLastMessage(messageData);
        setMessageHistory(prev => [...prev, messageData]);
      }
    });

    setSocket(socketInstance);
    return socketInstance;
  }, [url, authSession, isDemo, tournamentId]);

  useEffect(() => {
    let socketInstance = null;

    if (autoConnect) {
      socketInstance = connectSocket();
    }

    return () => {
      if (socketInstance) {
        socketInstance.close();
      }
    };
  }, [autoConnect, connectSocket])

  const emit = useCallback((eventName, data) => {
    if (!socket?.connected) {
      setError('Socket not connected');
      return false;
    }

    try {
      socket.emit(42, [eventName, data]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [socket]);

  const subscribe = useCallback((eventName, callback) => {
    if (!socket) return () => { };

    const wrappedCallback = (data) => {
      if (Array.isArray(data) && data[0] === eventName) {
        callback(data[1]);
      }
    };

    socket.on('42', wrappedCallback);
    return () => socket.off('42', wrappedCallback);
  }, [socket]);

  const clearHistory = useCallback(() => {
    setMessageHistory([]);
  }, []);

  const connect = useCallback(() => {
    if (!socket) {
      connectSocket();
    } else if (!socket.connected) {
      socket.connect();
    }
  }, [socket, connectSocket]);

  const disconnect = useCallback(() => {
    if (socket?.connected) {
      socket.disconnect();
    }
  }, [socket]);

  return {
    socket,
    isConnected,
    error,
    lastMessage,
    messageHistory,
    emit,
    subscribe,
    clearHistory,
    connect,
    disconnect
  };
};

export default useSocketConnection;