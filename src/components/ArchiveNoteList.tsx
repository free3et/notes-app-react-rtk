import { extractDatesFromText } from "../helpers/extractDatesFromText";
import { useDispatch, useSelector } from "react-redux";
import {
  selectArchiveNotes,
  Note,
  unarchiveNote,
} from "../features/notesSlice";
import { formatDate } from "../helpers/formatDate";
import { addImgToCategory } from "../helpers/showCategoryImg";
import { Table } from "./Table";

export const ArchiveNoteList: React.FC = () => {
  const archiveNotes = useSelector(selectArchiveNotes);
  const dispatch = useDispatch();

  const headersData = [
    "Name",
    "Created",
    "Category",
    "Content",
    "Dates",
    "Action",
  ];

  const handleUnarchiveNotes = (id: number) => {
    dispatch(unarchiveNote(id));
  };

  const bodyData = archiveNotes?.map(
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
            onClick={() => handleUnarchiveNotes(id)}
            className="unarchiveBtn btn btn-outline-primary btn-sm m-1"
          >
            Unarchive
          </button>
        </td>
      </tr>
    )
  );

  return (
    <Table
      tableId="archivedNotesTable"
      theadData={headersData}
      tbodyData={bodyData}
      tableColor="table-primary"
    />
  );
};