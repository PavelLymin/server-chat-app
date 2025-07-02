import express from 'express';
import authRouters from './src/routers/authRoutes.js'
// const http = require('http');
// const WebSocket = require('ws');
// const path = require('path');
// const { type } = require('os');

const app = express();
app.use(express.json());

app.use('/auth', authRouters);

// // Create HTTP server by passing the Express app
// const server = http.createServer(app);

// // Integrate WebSocket with the HTTP server
// const wss = new WebSocket.Server({ server });

// // Array to keep track of all connected clients
// const clients = [];

// wss.on('connection', function connection(ws) {
//     console.log("WS connection arrived");

//     // Add the new connection to our list of clients
//     clients.push(ws);

//     ws.on('message', function incoming(message) {
//         console.log('received: %s', message);

//         // Broadcast the message to all clients
//         clients.forEach(client => {
//             if (client.readyState === WebSocket.OPEN) {
//                 console.log("message",message.toString())
//                 client.send(JSON.stringify({
//                     type: message, 
//                     data: message.toString()
//                 }));
//             }
//         });
//     });

//     ws.on('close', () => {
//         // Remove the client from the array when it disconnects
//         const index = clients.indexOf(ws);
//         if (index > -1) {
//             clients.splice(index, 1);
//         }
//     });

//     // Send a welcome message on new connection
//     ws.send(JSON.stringify({
//         type: 'message', 
//         data:'Welcome to the chat!'
//     }));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});