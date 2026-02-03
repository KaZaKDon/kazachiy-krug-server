import { getUserByPhone } from "../store/users.js";

export function authSocket(io, socket) {

    socket.on("auth:login", ({ phone }) => {
        console.log("AUTH PHONE FROM CLIENT:", phone);

        const user = getUserByPhone(phone);

        console.log("FOUND USER:", user);

        if (!user) {
            socket.emit("auth:error", "Пользователь не найден");
            return;
        }

        socket.data.user = user;

        socket.emit("auth:success", {
            id: user.id,
            name: user.name,
            phone: user.phone,
            avatar: user.avatar
        });
    });
}