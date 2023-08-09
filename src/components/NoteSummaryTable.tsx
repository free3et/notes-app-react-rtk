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

  const headersData = ["Note Category", "Active notes", "Archived"];
  const [showArchivedTable, setShowArchivedTable] = useState(false);

  const handleShowArchivedTable = () => {
    setShowArchivedTable(!showArchivedTable);
  };

  const bodyData = ["Task", "Random Thought", "Idea", "Quote"].map(
    (category) => (
      <tr
        key={category}
        className="border border-slate-100 bg-slate-200 hover:bg-zinc-300"
      >
        <td className="xs:hidden p-3">
          <img
            src={addImgToCategory(category)}
            alt="category-icon"
            className="category-icon"
          />
        </td>
        <td className="p-3">{category}</td>
        <td className="p-3">{getNoteCountsByCategory(allNotes, category)}</td>
        <td className="p-3">
          {getNoteCountsByCategory(archivedNotes, category)}
        </td>
      </tr>
    )
  );

  return (
    <>
      <Table
        tableId="summaryTable"
        theadData={headersData}
        tbodyData={bodyData}
        onClickShowArchiveNotes={handleShowArchivedTable}
      />
      {showArchivedTable && <ArchiveNoteList />}
    </>
  );
};
