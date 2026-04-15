import "./NoteInput.css";

import { useState } from "react";

const NoteInput = ({ addNote }) => {
  const [text, setText] = useState("");

  const handleAddNote = () => {
    if (!text.trim()) return;
    addNote(text);
    setText("");
  };

  return (
    <div className="note-input-container">
      <input
        className="note-input-field"
        type="text"
        placeholder="New note"
        name="New note"
        id="new-note"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="note-input-button"
        onClick={handleAddNote}
        title="Add new note"
      >
        Add Note
      </button>
    </div>
  );
};

export default NoteInput;
