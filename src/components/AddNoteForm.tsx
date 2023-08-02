import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addNote, Note } from "../features/notesSlice";

interface InputFields {
  title: string;
  description: string;
  category: string;
}

export const AddNoteForm: React.FC = () => {
  const [inputFields, setInputFields] = useState<InputFields>({
    title: "",
    description: "",
    category: "Task",
  });
  const [errors, setErrors] = useState<Partial<InputFields>>({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setShowAlert] = useState(false);

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
      const newNote: Note = {
        id: Date.now(),
        name: inputFields.title,
        timeOfCreation: new Date().toISOString(),
        category: inputFields.category,
        noteContent: inputFields.description,
        archived: false,
      };

      dispatch(addNote(newNote));
      setSubmitting(true);
      setShowAlert(true);
      setInputFields({
        title: "",
        description: "",
        category: "Task",
      });
    }
  };

  const handleCloseModal = () => {
    setShowAlert(false);
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
            {Object.keys(errors).length === 0 && submitting && alert ? (
              <div className="alert alert-success text-center" role="alert">
                Successfully created ✓
              </div>
            ) : null}
            <div className="modal-header">
              <h5 className="modal-title" id="addNoteModalLabel">
                Add New Note
              </h5>{" "}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form
                id="newNoteForm"
                className="row g-3"
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor="noteTitle" className="form-label">
                    Note Title:
                  </label>
                  <input
                    type="text"
                    id="noteTitle"
                    className="form-control"
                    value={inputFields.title}
                    onChange={handleTitleChange}
                    style={{
                      border: errors.title ? "1px solid red" : undefined,
                    }}
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
