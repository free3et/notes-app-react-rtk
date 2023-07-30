import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes, deleteNote, Note } from "../features/notesSlice";

export const NoteList = () => {
  const notes = useSelector(selectAllNotes);

  console.log(notes);

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
        className="table table-striped table-dark table-hover table-borderless"
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
          {notes?.map(
            ({ id, name, timeOfCreation, category, noteContent }: Note) => (
              <tr>
                <td></td>
                <td className="note-title">{name}</td>
                <td className="note-created">{timeOfCreation}</td>
                <td className="note-category">{category}</td>
                <td className="note-description">{noteContent}</td>
                <td className="note-dates"></td>
                <td className="actions">
                  <button
                    onClick={() => handleDeleteNote(id)}
                    className="deleteBtn btn btn-outline-dark btn-sm m-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};
