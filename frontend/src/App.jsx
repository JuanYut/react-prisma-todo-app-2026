import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  deleteNoteFromApi,
  updateNote,
} from "./services/api.js";
import NoteInput from "./components/NoteInput/NoteInput.jsx";
import NoteItem from "./components/NoteItem/NoteItem.jsx";

function App() {
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        setError("Failed to load notes...");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (text) => {
    try {
      const newNote = await createNote(text);
      setNotes((prev) => [...prev, newNote]);
    } catch (error) {
      alert("Failed to save note. Please try again.");
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteNoteFromApi(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      alert("Failed to delete note. Please try again.");
    }
  };

  const toggleArchived = async (id) => {
    const noteToToggle = notes.find((n) => n.id === id);

    try {
      const updatedNote = await updateNote(id, {
        archived: !noteToToggle.archived,
      });

      setNotes((prev) => prev.map((n) => (n.id === id ? updatedNote : n)));
    } catch (error) {
      alert("Failed to archived note. Please try again.");
    }
  };

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Notes</h1>

      <NoteInput addNote={addNote} />

      <ul>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            toggleArchived={toggleArchived}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
