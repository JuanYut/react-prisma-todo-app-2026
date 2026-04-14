import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  deleteNoteFromApi,
  updateNote,
} from "./services/api.js";
import NoteInput from "./components/NoteInput/NoteInput.jsx";
import NoteItem from "./components/NoteItem/NoteItem.jsx";
import NoteFilter from "./components/NoteFilter/NoteFilter.jsx";

function App() {
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState("active");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

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

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;

    try {
      const updated = await updateNote(id, { text: editingText });

      setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));

      setEditingId(null);
      setEditingText("");
    } catch (error) {
      alert("Failed to edit note. Please try again.");
    }
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  const filteredNotes = notes.filter((note) => {
    if (filterNotes === "all") return true; // All notes
    if (filterNotes === "archived") return note.archived; // Archivhed notes
    return !note.archived; // Default: Active notes
  });

  if (loading) return <p>Loading notes...</p>;
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
      <h1 style={{ marginBottom: "20px" }}>Notes by Juan Santillán</h1>

      <NoteInput addNote={addNote} />

      <NoteFilter filterNotes={filterNotes} setFilterNotes={setFilterNotes} />

      <ul>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              toggleArchived={toggleArchived}
              editingId={editingId}
              editingText={editingText}
              setEditingText={setEditingText}
              saveEdit={saveEdit}
              startEdit={startEdit}
            />
          ))
        ) : (
          <p>No notes to show in this view.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
