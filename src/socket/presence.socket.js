const onlineUsers = new Map();

export function presenceSocket(io, socket) {
    socket.on("user:online", (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit("users:online", Array.from(onlineUsers.keys()));
    });

    socket.on("disconnect", () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
            }
        }
        io.emit("users:online", Array.from(onlineUsers.keys()));
    });
}