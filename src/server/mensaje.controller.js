import Mensaje from "./mensaje.model.js";

const MensajeController = {
  async nuevoMensaje(msg) {
    try {
      const nuevoMensaje = new Mensaje({
        usuario: msg.usuario,
        mensaje: msg.mensaje,
      });
      await nuevoMensaje.save();
    } catch (error) {
      console.error("Error al guardar un nuevo mensaje: " + error.message);
    }
  },
  async obtenerMensaje() {
    try {
      const mensajes = await Mensaje.find();
      return mensajes;
    } catch (error) {
      console.error("Error al obtener los mensajes: " + error.message);
    }
  },
};

export default MensajeController;
