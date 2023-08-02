import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Note,
  selectActiveNotes,
  selectArchiveNotes,
} from "../features/notesSlice";
import { addImgToCategory } from "../helpers/showCategoryImg";
import { Table } from "./Table";
import { ArchiveNoteList } from "./ArchiveNoteList";

export const NoteSummaryTable: React.FC = () => {
  const allNotes = useSelector(selectActiveNotes);
  const archivedNotes = useSelector(selectArchiveNotes);

  const getNoteCountsByCategory = (notes: Note[], category: string) =>
    notes.filter((note) => note.category === category).length;

  const headersData = ["Note Category", "Active", "Archived"];
  const [showArchivedTable, setShowArchivedTable] = useState(false);

  const handleShowArchivedTable = () => {
    setShowArchivedTable(!showArchivedTable);
  };

  const bodyData = ["Task", "Random Thought", "Idea", "Quote"].map(
    (category) => (
      <tr key={category}>
        <td>
          <img
            src={addImgToCategory(category)}
            alt="category-icon"
            className="category-icon"
          />
        </td>
        <td>{category}</td>
        <td>{getNoteCountsByCategory(allNotes, category)}</td>
        <td>{getNoteCountsByCategory(archivedNotes, category)}</td>
      </tr>
    )
  );

  return (
    <>
      <Table
        tableId="summaryTable"
        theadData={headersData}
        tbodyData={bodyData}
        tableColor="table-secondary"
        onClickShowArchiveNotes={handleShowArchivedTable}
      />
      {showArchivedTable && <ArchiveNoteList />}
    </>
  );
};
