//import { chats } from "../store/chats.js";

export function chatSocket(io, socket) {
    socket.on("chat:join", ({ chatId }) => {
        socket.join(chatId);
    });

    socket.on("chat:leave", ({ chatId }) => {
        socket.leave(chatId);
    });
}