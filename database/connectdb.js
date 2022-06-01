import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("🌟 👽 🌟 Base de datos conectada.");
} catch (error) {
  console.log("Error de conexión a MONGODB");
}
