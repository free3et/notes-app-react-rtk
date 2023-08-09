import { useDispatch, useSelector } from "react-redux";
import {
  selectArchiveNotes,
  Note,
  unarchiveNote,
} from "../features/notesSlice";
import { AppDispatch } from "../app/store";
import { extractDatesFromText } from "../helpers/extractDatesFromText";
import { formatDate } from "../helpers/formatDate";
import { addImgToCategory } from "../helpers/showCategoryImg";
import { Table } from "./Table";
import { Fragment } from "react";

export const ArchiveNoteList: React.FC = () => {
  const archiveNotes = useSelector(selectArchiveNotes);
  const dispatch: AppDispatch = useDispatch();

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
      <tr
        key={index}
        className="border border-slate-100 bg-indigo-200 hover:bg-zinc-300"
      >
        <td className="xs:hidden md:p-1 lg:p-2">
          <img
            src={addImgToCategory(category)}
            alt={category}
            className="category-icon"
          />
        </td>
        <td className="note-title sm:p-1 md:p-2 lg:p-2 xl:p-3 2xl:p-4">
          {name}
        </td>
        <td className="note-created sm:p-1 md:p-2 lg:p-2 xl:p-3 2xl:p-4">
          {formatDate(timeOfCreation)}
        </td>
        <td className="note-category sm:p-1 md:p-2 lg:p-2 xl:p-3 2xl:p-4">
          {category}
        </td>
        <td className="note-description sm:p-1 md:p-2 lg:p-4">{noteContent}</td>
        <td className="note-dates sm:p-1 md:p-2 lg:p-2 xl:p-3 2xl:p-4">
          {extractDatesFromText(noteContent).map((date, idx) => (
            <Fragment key={idx}>
              {date}
              {idx < 1 && <span className="date-separator" />}
            </Fragment>
          ))}
        </td>
        <td className="actions flex justify-center items-center p-2">
          <button
            onClick={() => handleUnarchiveNotes(id)}
            className="unarchiveBtn bg-blue-500 text-white py-1 px-2 rounded-md m-1 hover:bg-pink-500"
          >
            Unarchive
          </button>
        </td>
      </tr>
    )
  );

  const noArchiveNotes = (
    <td colSpan={7}>
      <h5 className="text-center p-4 border border-slate-100 bg-indigo-200 text-xl font-bold">
        You have no archived notes!
      </h5>
    </td>
  );

  return (
    <Table
      tableId="archivedNotesTable"
      theadData={headersData}
      tbodyData={archiveNotes.length ? bodyData : [noArchiveNotes]}
    />
  );
};
