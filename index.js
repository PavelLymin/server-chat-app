import express from 'express';
import authRouters from './src/routers/authRoutes.js'
import chatRoutes from './src/routers/chatRoutes.js'
import mesageRoutes from './src/routers/messageRouters.js'
import userRoutes from './src/routers/userRoutes.js'
import http from 'http';
import {WebSocketServer} from 'ws';
import { deleteMessage, saveMessage } from './src/controllers/messageController.js';

const app = express();
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const chatRooms = new Map();

app.use('/auth', authRouters);
app.use('/chat', chatRoutes);
app.use('/message', mesageRoutes)
app.use('/', userRoutes);

wss.on('connection', (client) => {
    console.log('A user connected');

    client.on('message', async (rawMessage) => {
        try {
            const message = JSON.parse(rawMessage);

            if (message.type === 'joinToChat'){
                const {chat_id} = message;
                if (!chatRooms.has(chat_id)) {
                    chatRooms.set(chat_id, new Set());
                }
                chatRooms.get(chat_id).add(client);
                console.log(`User joined chat:`, chat_id);
            } else if (message.type === 'sendMessage') {
                const { chat_id, sender_id, content } = message.message;
                const room = chatRooms.get(chat_id);
                if (!room) {
                    throw new Error(`Chat ${chat_id} not found`);
                }

                const savedMsg = await saveMessage(chat_id, sender_id, content);
                const response = JSON.stringify({
                    type: 'newMessage',
                    message: savedMsg
                });
                
                chatRooms.get(chat_id).forEach((client) => {
                    client.send(response);
                });
            } else if (message.type === 'deleteMessage'){
                const {message_id, chat_id} = message;
                const deletedMessage = await deleteMessage(message_id);
                const response = JSON.stringify({
                    type: 'deletedMessage',
                    message: deletedMessage,
                });

                chatRooms.get(chat_id).forEach((client) => {
                    client.send(response);
                });
            }
        } catch (error) {
            console.error('WS Error:', error);
            client.send(JSON.stringify({
                type: 'error',
                message: error.message
            }));
        }
    });

    client.on('close', () => {
    console.log('User disconnected');
    
    chatRooms.forEach((users, chatId) => {
      if (users.has(client)) {
        users.delete(client);

        if (users.size === 0) {
          chatRooms.delete(chatId);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});