// const express = require("express");
// const mysql = require("mysql2");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();

// const app = express();
// app.use(cors());
// const port = process.env.PORT || 5000;

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
// // connection.connect((error) => {
// //   if (error) {
// //     console.error("Error connecting to MySQL database:", error);
// //   } else {
// //     console.log("Connected to MySQL database");
// //   }
// // });

// app.use(express.json());

// // API endpoint for retrieving notes
// app.get("/api/notes", (req, res) => {
//   const query = "SELECT * FROM notes";
//   const result = connection.query(qyery);
//   res.send(result);
// });

// // API endpoint for creating a new note
// app.post("/api/notes", async (req, res) => {
//   const { text, date } = req.body;
//   const query = `INSERT INTO notes (text, date) VALUES ${text},${date}`;
//   const result = await connection.query(query);
//   res.send(result);
//   // connection.query(query, values, (error, result) => {
//   //   if (error) {
//   //     console.error("Error creating a new note:", error);
//   //     res.status(500).json({ error: "Failed to create a new note" });
//   //   } else {
//   //     const newNote = { id: result.insertId, text, date };
//   //     res.json(newNote);
//   //   }
//   // });
// });

// // API endpoint for deleting a note
// app.delete("/api/notes/:id", (req, res) => {
//   const noteId = req.params.id;
//   const query = "DELETE FROM notes WHERE id = ?";

//   connection.query(query, noteId, (error) => {
//     if (error) {
//       console.error("Error deleting a note:", error);
//       res.status(500).json({ error: "Failed to delete the note" });
//     } else {
//       res.sendStatus(204);
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use(express.json());

// API endpoint for retrieving notes
app.get("/api/notes", (req, res) => {
  const query = "SELECT * FROM notes";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving notes:", error);
      res.status(500).json({ error: "Failed to retrieve notes" });
    } else {
      res.json(results);
    }
  });
});

// API endpoint for creating a new note
app.post("/api/notes", (req, res) => {
  const { text, date } = req.body;
  const query = "INSERT INTO notes (text, date) VALUES (?, ?)";
  const values = [text, date];

  connection.query(query, values, (error, result) => {
    if (error) {
      console.error("Error creating a new note:", error);
      res.status(500).json({ error: "Failed to create a new note" });
    } else {
      const newNote = { id: result.insertId, text, date };
      res.json(newNote);
    }
  });
});

// API endpoint for deleting a note
app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const query = "DELETE FROM notes WHERE id = ?";

  connection.query(query, noteId, (error) => {
    if (error) {
      console.error("Error deleting a note:", error);
      res.status(500).json({ error: "Failed to delete the note" });
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
