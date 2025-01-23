import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todos", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à MongoDB réussie !");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
  }
};

export default connectDB;
