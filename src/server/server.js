import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import { open } from "sqlite";


// Öppna SQLite-databas
let db;
(async () => {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Skapa tabell om den inte finns
  await db.exec(`
    CREATE TABLE IF NOT EXISTS kunder (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      name TEXT
    )
  `);
})();

  const columns = await db.all("PRAGMA table_info(kunder)");
  const hasText = columns.some(col => col.name === "text");
  if (!hasText) {
    await db.exec("ALTER TABLE kunder ADD COLUMN text TEXT");
  }
();

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // your Vite frontend
app.use(express.json());

// Test endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vite + Express server 🎉" });
});

app.post("/api/email", (req, res) => {
    console.log(req.body);
    const { text } = req.body;
    const result = db.run("INSERT INTO kunder (email,name) VALUES (?, ?)", [text.name, text.email]);
    res.json({ id: result.lastID, text });  
});

app.get("/api/emails", async (req, res) => {
  const rows = await db.all("SELECT * FROM kunder");
  res.json(rows);
});



app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});