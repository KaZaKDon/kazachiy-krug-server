export default function initSocket(io) {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('ping', (data) => {
            console.log('Ping received from client:', data);

            socket.emit('pong', {
                message: 'pong from server',
                time: Date.now(),
            });
        });

        socket.on('join:chat', ({ chatId }) => {
            console.log(`Socket ${socket.id} joined chat ${chatId}`);

            socket.join(chatId);

            socket.emit('chat:joined', { chatId });
        });

        socket.on('message:send', ({ id, chatId, text, sender }) => {
            console.log(`Message to ${chatId} from ${socket.id}:`, text);

            const message = {
                id,                 // ← ВАЖНО: сохраняем client id
                chatId,
                text,
                sender,             // { id, name }
                createdAt: Date.now(),
            };

            // ❗ отправляем всем, КРОМЕ отправителя
            socket.to(chatId).emit('message:new', message);
        });

        socket.on('typing:start', ({ chatId }) => {
            socket.to(chatId).emit('typing:start', {
                chatId,
                userId: socket.id,
            });
        });

        socket.on('typing:stop', ({ chatId }) => {
            socket.to(chatId).emit('typing:stop', {
                chatId,
                userId: socket.id,
            });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}