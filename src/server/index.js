import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import MensajeController from "./mensaje.controller.js";
import ConectarDB from "./database.js";

const app = express();
const server = createServer(app);
ConectarDB();

const io = new Server(server, {
  connectionStateRecovery: {},
});

// Cuando un usuario se conecta
io.on("connection", async (socket) => {
  console.log("Usuario conectado.");
  try {
    const mensajes = await MensajeController.obtenerMensaje();
    socket.emit("mensajes", mensajes);
  } catch (error) {
    console.log("Error al obtener los mensajes: " + error.message);
  }

  // Cuando llega un mensaje desde el cliente, el servidor lo procesa
  socket.on("chatMessage", async (msg) => {
    try {
      await MensajeController.nuevoMensaje(msg);
    } catch (error) {
      console.log("Error al guardar mensaje: " + error.message);
    }
    // Emite el mensaje a los demas usuarios conectados
    io.emit("chatMessage", msg);
  });
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/src/client/index.html");
});

const port = process.env.PORT ?? 3000;
server.listen(port, () => {
  console.log("Servidor iniciado");
});
