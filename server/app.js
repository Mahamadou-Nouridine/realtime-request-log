// server.js
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors:{
  origin: true
}});

app.use(express.json());

// API routes
app.post('/api/data', (req, res) => {
  // Process the POST request

  // Emit a socket event to notify clients
  io.emit('apiEvent', { method: 'POST', data: req.body });

  res.json({ success: true });
});

app.get('/api/data', (req, res) => {
  // Process the GET request

  // Emit a socket event to notify clients
  io.emit('apiEvent', { method: 'GET' });

  res.json({ success: true, message: 'Data retrieved successfully' });
});

app.delete('/api/data/:id', (req, res) => {
  // Process the DELETE request

  // Emit a socket event to notify clients
  io.emit('apiEvent', { method: 'DELETE', id: req.params.id });

  res.json({ success: true, message: `Data with ID ${req.params.id} deleted successfully` });
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log(socket);
  console.log('A user connected');

  io.on("disconnect", () => {
    console.log("A user disconnected");
  })
});

// Start the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
