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

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}