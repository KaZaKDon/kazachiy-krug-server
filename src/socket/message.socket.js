import { chats } from "../store/chats.js";

export function messageSocket(io, socket) {
    socket.on("message:send", (message) => {
        const chat = chats[message.chatId];
        if (!chat) return;

        chat.messages.push(message);

        io.to(message.chatId).emit("message:new", message);
    });
}