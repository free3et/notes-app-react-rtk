import { useState } from "react";
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

export const ActiveNoteList: React.FC = () => {
  const activeNotes = useSelector(selectActiveNotes);
  const dispatch: AppDispatch = useDispatch();

  const [editingNote, setEditingNote] = useState<Note | null>(null);

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
  };

  const handleDeleteNote = (id: number) => {
    dispatch(deleteNote(id));
  };

  const handleArchiveNotes = (id: number) => {
    dispatch(archiveNote(id));
  };

  const bodyData = activeNotes.map((note: Note, index: number) => (
    <tr key={index}>
      <td>
        <img
          src={addImgToCategory(note.category)}
          alt={note.category}
          className="category-icon"
        />
      </td>
      <td className="note-title">{note.name}</td>
      <td className="note-created">{formatDate(note.timeOfCreation)}</td>
      <td className="note-category">{note.category}</td>
      <td className="note-description">{note.noteContent}</td>
      <td className="note-dates">
        {extractDatesFromText(note.noteContent)[0]}
        {<br />}
        {extractDatesFromText(note.noteContent)[1]}
      </td>
      <td className="actions">
        <button
          onClick={() => handleEditNote(note)}
          type="button"
          className="editBtn btn btn-outline-success btn-sm m-1"
          data-bs-target="#editNoteModal"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteNote(note.id)}
          className="deleteBtn btn btn-outline-dark btn-sm m-1"
        >
          Delete
        </button>
        <button
          onClick={() => handleArchiveNotes(note.id)}
          className="archiveBtn btn btn-outline-primary btn-sm m-1"
        >
          Archive
        </button>
      </td>
    </tr>
  ));

  const noActiveNotes = (
    <tr>
      <td colSpan={Number("7")}>
        <h5 className="text-center text-info">
          You have no saved notes! Please add your first!
        </h5>
      </td>
    </tr>
  );

  return (
    <>
      <Table
        tableId="activeNotesTable"
        theadData={headersData}
        tbodyData={activeNotes.length ? bodyData : noActiveNotes}
        tableColor="table-light"
      />
      {editingNote && (
        <EditNoteForm
          editingNote={editingNote}
          onClose={() => setEditingNote(null)}
        />
      )}
    </>
  );
};
