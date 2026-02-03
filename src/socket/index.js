import { authSocket } from "./auth.socket.js";
import { chatSocket } from "./chat.socket.js";
import { messageSocket } from "./message.socket.js";
import { presenceSocket } from "./presence.socket.js";

export function initSocket(io) {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        authSocket(io, socket);
        chatSocket(io, socket);
        messageSocket(io, socket);
        presenceSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}