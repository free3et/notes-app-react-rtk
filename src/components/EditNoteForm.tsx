import { useDispatch } from "react-redux";
import { editNote, Note } from "../features/notesSlice";
import { NoteForm } from "./NoteForm";
import { InputFields } from "./NoteForm";

interface FormProps {
  editingNote: Note;
  onClose: () => void;
  isOpen: boolean;
}

export const EditNoteForm: React.FC<FormProps> = ({
  editingNote,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (values: InputFields) => {
    const updatedNote: Note = {
      ...editingNote,
      name: values.title,
      category: values.category,
      noteContent: values.description,
    };

    dispatch(editNote(updatedNote));
  };

  return (
    <NoteForm
      initialValues={{
        title: editingNote.name,
        description: editingNote.noteContent,
        category: editingNote.category,
      }}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      title="Edit Note"

    />
  );
};
