import { addImgToCategory } from "../helpers/showCategoryImg";
import { useSelector } from "react-redux";
import {
  Note,
  selectAllNotes,
  selectArchiveNotes,
} from "../features/notesSlice";
import { Table } from "./Table";
import { useState } from "react";
import { ArchiveNoteList } from "./ArchiveNoteList";

export const NoteSummaryTable: React.FC = () => {
  const allNotes = useSelector(selectAllNotes);
  const archivedNotes = useSelector(selectArchiveNotes);

  const getNoteCountsByCategory = (notes: Note[], category: string) =>
    notes.filter((note) => note.category === category).length;

  const headersData = ["Note Category", "Active", "Archived"];
  const [showArchivedTable, setShowArchivedTable] = useState(false);

  const handleShowArchivedTable = () => {
    setShowArchivedTable(!showArchivedTable);
  };

  const bodyData = (
    <>
      <tr>
        <td>
          <img
            src={addImgToCategory("Task")}
            alt="category-icon"
            className="category-icon"
          />
        </td>
        <td>Task</td>
        <td>{getNoteCountsByCategory(allNotes, "Task")}</td>
        <td>{getNoteCountsByCategory(archivedNotes, "Task")}</td>
      </tr>
      <tr>
        <td>
          <img
            src={addImgToCategory("Random Thought")}
            alt="category-icon"
            className="category-icon"
          />
        </td>
        <td>Random Thought</td>
        <td>{getNoteCountsByCategory(allNotes, "Random Thought")}</td>
        <td>{getNoteCountsByCategory(archivedNotes, "Random Thought")}</td>
      </tr>
      <tr>
        <td>
          <img
            src={addImgToCategory("Idea")}
            alt="category-icon"
            className="category-icon"
          />
        </td>
        <td>Idea</td>
        <td>{getNoteCountsByCategory(allNotes, "Idea")}</td>
        <td>{getNoteCountsByCategory(archivedNotes, "Idea")}</td>
      </tr>
      <tr>
        <td>
          <img
            src={addImgToCategory("Quote")}
            alt="category-icon"
            className="category-icon"
          />
        </td>
        <td>Idea</td>
        <td>{getNoteCountsByCategory(allNotes, "Quote")}</td>
        <td>{getNoteCountsByCategory(archivedNotes, "Quote")}</td>
      </tr>
    </>
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
