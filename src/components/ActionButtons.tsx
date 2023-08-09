import { Note } from "features/notesSlice";
import React from "react";

interface ActionButtonsProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  note,
  onEdit,
  onDelete,
  onArchive,
}) => (
  <td className="actions flex-row sm:flex-col justify-center items-center sm:p-2 md:p-2">
    <button
      onClick={() => onEdit(note)}
      type="button"
      className="editBtn bg-green-500 text-white py-1 px-2 rounded-md m-1 hover:bg-orange-500"
    >
      Edit
    </button>
    <button
      onClick={() => onDelete(note.id)}
      className="deleteBtn bg-gray-700 text-white py-1 px-2 rounded-md m-1 hover:bg-indigo-500"
    >
      Delete
    </button>
    <button
      onClick={() => onArchive(note.id)}
      className="archiveBtn bg-blue-500 text-white py-1 px-2 rounded-md m-1 hover:bg-pink-500"
    >
      Archive
    </button>
  </td>
);

export default ActionButtons;
