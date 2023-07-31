export const EditNote = () => {
  return (
    <div
      id="editNotePopup"
      className="modal fade"
      tabIndex={Number("-1")}
      aria-labelledby="editNoteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="editNoteModalLabel">
              Edit Note
            </h4>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control editNoteTitle mb-3"
              placeholder="Title"
            />
            <textarea
              className="form-control editNoteDescription"
              placeholder="Description"
            ></textarea>
            <label htmlFor="editNoteCategory" className="form-label">
              Category:
            </label>
            <select
              id="editNoteCategory"
              className="form-control form-select"
              required
            >
              <option value="Task">Task</option>
              <option value="Random Thought">Random Thought</option>
              <option value="Idea">Idea</option>
              <option value="Quote">Quote</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary saveNoteChangesBtn"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary closeEditNotePopupBtn"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
