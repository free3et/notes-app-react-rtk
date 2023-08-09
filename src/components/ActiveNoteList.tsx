import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveNotes,
  deleteNote,
  Note,
  archiveNote,
} from "../features/notesSlice";
import { extractDatesFromText } from "../helpers/extractDatesFromText";
import { formatDate } from "../helpers/formatDate";
import { addImgToCategory } from "../helpers/showCategoryImg";
import { Table } from "./Table";
import { EditNoteForm } from "./EditNoteForm";
import { AppDispatch } from "../app/store";
import ActionButtons from "./ActionButtons";

export const ActiveNoteList: React.FC = () => {
  const activeNotes = useSelector(selectActiveNotes);
  const dispatch: AppDispatch = useDispatch();

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headersData = [
    "Name",
    "Created",
    "Category",
    "Content",
    "Dates",
    "Action",
  ];

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (id: number) => {
    dispatch(deleteNote(id));
  };

  const handleArchiveNotes = (id: number) => {
    dispatch(archiveNote(id));
  };

  const bodyData = activeNotes.map((note: Note, index: number) => (
    <tr
      key={index}
      className="border border-slate-100 bg-slate-200 hover:bg-zinc-300"
    >
      <td className="xs:hidden md:p-1 lg:p-2">
        <img
          src={addImgToCategory(note.category)}
          alt={note.category}
          className="category-icon"
        />
      </td>
      <td className="note-title sm:p-1 md:p-2 lg:p-2 xl:p-3 2xl:p-4">
        {note.name}
      </td>
      <td className="note-created sm:p-1 md:p-2 lg:p-2 xl:p-3 2xl:p-4">
        {formatDate(note.timeOfCreation)}
      </td>
      <td className="note-category sm:p-1 md:p-2 lg:p-2 xl:p-3 2xl:p-4">
        {note.category}
      </td>
      <td className="note-description sm:p-1 md:p-2 lg:p-4">
        {note.noteContent}
      </td>
      <td className="note-dates sm:p-1 md:p-2 lg:p-2 xl:p-3 2xl:p-4">
        {extractDatesFromText(note.noteContent).map((date, idx) => (
          <Fragment key={idx}>
            {date}
            {idx < 1 && <span className="date-separator" />}
          </Fragment>
        ))}
      </td>
      <ActionButtons
        note={note}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
        onArchive={handleArchiveNotes}
      />
    </tr>
  ));

  const noActiveNotes = (
    <div className="text-center text-info">
      You have no saved notes! Please add your first!
    </div>
  );

  return (
    <>
      <Table
        tableId="activeNotesTable"
        theadData={headersData}
        tbodyData={activeNotes.length ? bodyData : [noActiveNotes]}
      />
      {editingNote && (
        <EditNoteForm
          editingNote={editingNote}
          onClose={() => {
            setEditingNote(null);
            setIsModalOpen(false);
          }}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
};
