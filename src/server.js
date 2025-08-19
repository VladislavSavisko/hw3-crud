import express from "express";
import dotenv from "dotenv";
import contactsRouter from "./routes/contactRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

dotenv.config();

const app = express();

app.use(express.json());

// опційно: проста головна сторінка, щоб не лякати 404 у браузері
app.get("/", (_req, res) => {
  res.send("✅ API працює! Використовуйте /api/contacts");
});

app.use("/api/contacts", contactsRouter);

// 404 для невідомих маршрутів
app.use(notFoundHandler);

// загальний обробник помилок
app.use(errorHandler);

const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

initMongoConnection(MONGO_URI).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});
