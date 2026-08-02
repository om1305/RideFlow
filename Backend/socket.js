import { Server } from "socket.io";
import prisma from "./src/Config/prisma.js";

let io;

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log("Connected:", socket.id);

        // =======================
        // USER / CAPTAIN JOIN
        // =======================
        socket.on("join", async ({ userId, userType }) => {

            console.log("JOIN RECEIVED");

    console.log(userId);

    console.log(userType);

            try {

                if (userType === "user") {

                    await prisma.user.update({
                        where: { id: userId },
                        data: {
                            socketId: socket.id
                        }
                    });

                }


                if (userType === "captain") {

                    await prisma.captain.update({
                        where: { id: userId },
                        data: {
                            socketId: socket.id
                        }
                    });

                }

                console.log(`${userType} joined -> ${socket.id}`);

            } catch (err) {
                console.log(err);
            }

        });


        // =======================
        // CAPTAIN LOCATION UPDATE
        // =======================
        socket.on("update-location-captain", async ({ userId, location }) => {

            try {

                await prisma.captain.update({
                    where: { id: userId },
                    data: {
                        locationLat: location.lat,
                        locationLon: location.lon
                    }
                });

            } catch (err) {
                console.log(err);
            }

        });


        socket.on("disconnect", () => {

            console.log("Disconnected:", socket.id);

        });

    });

};


export const sendMessageToSocketId = (socketId, event, data) => {

    if (!io) {
        console.log("Socket not initialized");
        return;
    }

    io.to(socketId).emit(event, data);

};

export { io };