import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes, deleteNote, Note } from "../features/notesSlice";

export const NoteList = () => {
  const notes = useSelector(selectAllNotes);
  const dispatch = useDispatch();

  const handleDeleteNote = (id: number) => {
    dispatch(deleteNote(id));
  };

  /*  const handleArchiveNote = (id: number) => {
    dispatch(archiveNote(id));
  };

  const handleUnarchiveNote = (id: number) => {
    dispatch(unarchiveNote(id));
  }; */

  return (
    <>
      <table
        id="allNotesTable"
        className="table table-striped table-light table-hover table-borderless"
      >
        <thead>
          <tr className="table-dark">
            <th></th>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes?.map((note: Note) => (
            <tr>
              <td></td>
              <td className="note-title">${note.name}</td>
              <td className="note-created">${note.timeOfCreation}</td>
              <td className="note-category">${note.category}</td>
              <td className="note-description">${note.noteContent}</td>
              <td className="note-dates"></td>
              <td className="actions">
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="deleteBtn btn btn-outline-dark btn-sm m-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
