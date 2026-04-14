import "dotenv/config";
import express from "express";
import { handleNotes } from "./routes/notes.js";

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
app.all("/{*any}", async (req, res) => {
  try {
    const response = await handleNotes(req);

    if (response) {
      return res.status(response.status).json(response.body);
    }

    return res.status(404).send("Not Found");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
