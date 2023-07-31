import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote, Note } from "../features/notesSlice";

export const AddNoteForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Task");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const submitNewNote = (e: React.FormEvent) => {
    e.preventDefault();

    const newNote: Note = {
      id: Date.now(),
      name: title,
      timeOfCreation: new Date().toISOString(),
      category: category,
      noteContent: description,
      archived: false,
    };

    dispatch(addNote(newNote));
    setTitle("");
    setDescription("");
    setCategory("Task");
  };

  return (
    <div className="container d-flex justify-content-center">
      <button
        type="button"
        className="btn btn-info m-3 addNewNote"
        data-bs-toggle="modal"
        data-bs-target="#addNoteModal"
      >
        Create Note
      </button>

      <div
        className="modal fade"
        id="addNoteModal"
        tabIndex={Number("-1")}
        aria-labelledby="addNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addNoteModalLabel">
                Add New Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                id="newNoteForm"
                className="row g-3"
                onSubmit={submitNewNote}
              >
                <div>
                  <label htmlFor="noteTitle" className="form-label">
                    Note Title:
                  </label>
                  <input
                    type="text"
                    id="noteTitle"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="form-label">
                    Category:
                  </label>
                  <select
                    id="category"
                    className="form-control form-select"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="Task">Task</option>
                    <option value="Random Thought">Random Thought</option>
                    <option value="Idea">Idea</option>
                    <option value="Quote">Quote</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="noteDescription" className="form-label">
                    Description:
                  </label>
                  <textarea
                    id="noteDescription"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-success">
                    Add Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
