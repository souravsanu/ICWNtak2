import React, { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => {
        console.error("Error retrieving notes:", error);
      });
  }, []);

  const addNote = (text) => {
    const date = new Date().toLocaleDateString();

    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, date }),
    })
      .then((response) => response.json())
      .then((newNote) => {
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
      })
      .catch((error) => {
        console.error("Error adding a new note:", error);
      });
  };

  const deleteNote = (id) => {
    fetch(`/api/notes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const updatedNotes = notes.filter((note) => note.id !== id);
          setNotes(updatedNotes);
        } else {
          console.error("Error deleting the note");
        }
      })
      .catch((error) => {
        console.error("Error deleting the note:", error);
      });
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
