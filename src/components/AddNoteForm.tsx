import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote, Note } from "../features/notesSlice";
import { NoteForm } from "./NoteForm";
import { InputFields } from "./NoteForm";

export function AddNoteForm() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values: InputFields) => {
    const newNote: Note = {
      id: Date.now(),
      name: values.title,
      timeOfCreation: new Date().toISOString(),
      category: values.category,
      noteContent: values.description,
      archived: false,
    };

    dispatch(addNote(newNote));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline "
        >
          Add Note
        </button>
      </div>
      <NoteForm
        initialValues={{ title: "", description: "", category: "Task" }}
        onSubmit={handleSubmit}
        onClose={() => {
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
        title="Add Note"
      />
    </>
  );
}
