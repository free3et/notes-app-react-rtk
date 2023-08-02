import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { editNote, Note } from "../features/notesSlice";
import { AppDispatch } from "../app/store";

interface FormProps {
  editingNote: Note;
  onClose: () => void;
}

interface InputFields {
  title: string;
  description: string;
  category: string;
}

export const EditNoteForm: React.FC<FormProps> = ({ editingNote, onClose }) => {
  const [inputFields, setInputFields] = useState<InputFields>({
    title: editingNote.name,
    description: editingNote.noteContent,
    category: editingNote.category,
  });

  const [originalFields, setOriginalFields] = useState<InputFields>({
    title: editingNote.name,
    description: editingNote.noteContent,
    category: editingNote.category,
  });
  const [errors, setErrors] = useState<Partial<InputFields>>({});

  const dispatch: AppDispatch = useDispatch();

  const validateValues = (inputValues: InputFields) => {
    let errors: Partial<InputFields> = {};
    if (inputValues.title.length < 5) {
      errors.title = "Title is too short";
    }
    if (inputValues.description.length < 8) {
      errors.description = "Description is too short";
    }
    return errors;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFields({ ...inputFields, title: e.target.value.trim() });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputFields({ ...inputFields, category: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputFields({ ...inputFields, description: e.target.value.trim() });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateValues(inputFields);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const updatedNote: Note = {
        ...editingNote,
        name: inputFields.title,
        category: inputFields.category,
        noteContent: inputFields.description,
      };

      dispatch(editNote(updatedNote));
      onClose();
    }
  };

  const handleCloseModal = () => {
    const errors = validateValues(inputFields);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const previousNote: Note = {
        ...editingNote,
        name: originalFields.title,
        category: originalFields.category,
        noteContent: originalFields.description,
      };

      dispatch(editNote(previousNote));
    }
    onClose();
  };

  return (
    <div
      id="editNoteModal"
      className="modal fade show"
      tabIndex={Number("-1")}
      aria-labelledby="editNoteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Note</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="noteTitle" className="form-label">
                  Note Title:
                </label>
                <input
                  type="text"
                  id="noteTitle"
                  className="form-control"
                  name="title"
                  value={inputFields.title}
                  onChange={handleTitleChange}
                  style={{ border: errors.title ? "1px solid red" : undefined }}
                />
                {errors.title ? (
                  <p className="error">
                    Title should be at least 5 characters long
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="category" className="form-label">
                  Category:
                </label>
                <select
                  id="category"
                  className="form-control form-select"
                  name="category"
                  value={inputFields.category}
                  onChange={handleCategoryChange}
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
                  name="description"
                  value={inputFields.description}
                  onChange={handleDescriptionChange}
                  style={{
                    border: errors.description ? "1px solid red" : undefined,
                  }}
                ></textarea>
                {errors.description ? (
                  <p className="error">
                    Description should be at least 8 characters long
                  </p>
                ) : null}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
