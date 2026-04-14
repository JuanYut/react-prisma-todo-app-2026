import { useEffect, useState } from "react";
import { getNotes, createNote } from "./services/api.js";
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
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
}

export default App;
