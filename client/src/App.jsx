// src/App.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server URL

function App() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // Listen for the socket event
    socket.on('apiEvent', (data) => {
      console.log(data);
      setEvents((prevEvents) => [data, ...prevEvents]);
    });


    // Clean up the socket connection when the component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <div>
      <h1>Real-time API Events</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
