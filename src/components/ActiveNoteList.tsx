import { extractDatesFromText } from "../helpers/extractDatesFromText";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllNotes,
  deleteNote,
  Note,
  archiveNote,
} from "../features/notesSlice";
import { formatDate } from "../helpers/formatDate";
import { addImgToCategory } from "../helpers/showCategoryImg";
import { Table } from "./Table";

export const ActiveNoteList: React.FC = () => {
  const activeNotes = useSelector(selectAllNotes);
  const dispatch = useDispatch();

  const headersData = [
    "Name",
    "Created",
    "Category",
    "Content",
    "Dates",
    "Action",
  ];

  const handleDeleteNote = (id: number) => {
    dispatch(deleteNote(id));
  };

  const handleArchiveNotes = (id: number) => {
    dispatch(archiveNote(id));
  };

  /* const handleUnarchiveNote = (id: number) => {
    dispatch(unarchiveNote(id));
  }; */

  const bodyData = activeNotes.map(
    (
      { id, name, timeOfCreation, category, noteContent }: Note,
      index: number
    ) => (
      <tr>
        <td>
          <img
            src={addImgToCategory(category)}
            alt={category}
            className="category-icon"
          />
        </td>
        <td className="note-title">{name}</td>
        <td className="note-created">{formatDate(timeOfCreation)}</td>
        <td className="note-category">{category}</td>
        <td className="note-description">{noteContent}</td>
        <td className="note-dates">{extractDatesFromText(noteContent)}</td>
        <td className="actions">
          <button
            onClick={() => handleDeleteNote(id)}
            className="deleteBtn btn btn-outline-dark btn-sm m-1"
          >
            Delete
          </button>
          <button
            onClick={() => handleArchiveNotes(id)}
            className="archiveBtn btn btn-outline-primary btn-sm m-1"
          >
            Archive
          </button>
        </td>
      </tr>
    )
  );

  return (
    <Table
      tableId="activeNotesTable"
      theadData={headersData}
      tbodyData={bodyData}
      tableColor="table-dark"
    />
  );
};
