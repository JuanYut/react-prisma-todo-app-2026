import "dotenv/config";
import express from "express";
import notesRoutes from "./routes/notes.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to JSON
app.use(express.json());

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, DELETE, PATCH",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// routes
app.use("/notes", notesRoutes);

app.use((req, res) => res.status(404).send("Not Found"));

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
