import "./NoteItem.css";

const NoteItem = ({
  note,
  deleteNote,
  toggleArchived,
  editingId,
  editingText,
  setEditingText,
  saveEdit,
  startEdit,
}) => {
  const isEditing = editingId === note.id;

  return (
    <div className={`note-card ${note.archived ? "archived" : ""}`}>
      {isEditing ? (
        <div className="edit-container">
          <input
            className="edit-input"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            autoFocus
          />
          <button className="btn btn-save" onClick={() => saveEdit(note.id)}>
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="note-content">
            <span className="note-title">{note.text}</span>
          </div>

          <div className="note-actions">
            <button
              className="btn btn-archive"
              onClick={() => toggleArchived(note.id)}
              title="Archive note"
            >
              {note.archived ? "Unarchive " : "Archive"}
            </button>
            <button
              className="btn btn-edit"
              onClick={() => startEdit(note)}
              title="Edit note"
            >
              Edit
            </button>
            <button
              className="btn btn-delete"
              onClick={() => deleteNote(note.id)}
              title="Delete note"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteItem;
