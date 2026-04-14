import "./NoteFilter.css";

const NoteFilter = ({ filterNotes, setFilterNotes }) => {
  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button
          className={`btn-filter ${filterNotes === "active" ? "active" : ""}`}
          onClick={() => setFilterNotes("active")}
        >
          Active
        </button>
        <button
          className={`btn-filter ${filterNotes === "archived" ? "active" : ""}`}
          onClick={() => setFilterNotes("archived")}
        >
          Archived
        </button>
        <button
          className={`btn-filter ${filterNotes === "all" ? "active" : ""}`}
          onClick={() => setFilterNotes("all")}
        >
          All Notes
        </button>
      </div>
    </div>
  );
};

export default NoteFilter;
