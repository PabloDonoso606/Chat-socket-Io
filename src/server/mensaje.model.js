import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mensajeSchema = new Schema(
  {
    usuario: String,
    mensaje: String,
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Mensaje = mongoose.model("Mensaje", mensajeSchema);

export default Mensaje;
