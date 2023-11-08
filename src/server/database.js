import mongoose from "mongoose";
async function ConectarDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat-Socket-io");
    console.log("Conexion a la base de datos exitosa.");
  } catch (error) {
    console.error("Error al conectar a la base de datos: " + error.message);
  }
}

export default ConectarDB;
