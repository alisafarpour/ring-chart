import React from 'react';
import useSocketConnection from '../hooks/useSocketConnection';

const Trading = () => {
  const {
    isConnected,
    error,
    lastMessage,
    emit,
    clearHistory
  } = useSocketConnection({
    url: 'wss://ws2.qxbroker.com',
    authSession: 'MJ6a4jCllQG2jlMVvHie9fMpVYSoZHbylvf9aOri',
    isDemo: 1,
    tournamentId: 0,
    autoConnect: true
  });

  const handleRequestInstruments = () => {
    emit('instruments/list', { _placeholder: true, num: 0 });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Trading Socket Status</h1>
      
      <p className="text-center text-xl mb-4">
        Status: {' '}
        <span className={isConnected ? "text-green-600" : "text-red-500"}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </p>

      {error && (
        <p className="text-red-500 text-center mb-4">
          Error: {error}
        </p>
      )}

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={handleRequestInstruments}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Request Instruments
        </button>
        <button
          onClick={clearHistory}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Clear History
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Last Message:</h2>
        {lastMessage ? (
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(lastMessage, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500 text-center">No messages received</p>
        )}
      </div>
    </div>
  );
};

export default Trading;