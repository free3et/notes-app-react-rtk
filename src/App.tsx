import { AddNoteForm } from "./components/AddNoteForm";
import { NoteList } from "./components/NoteList";

const App = () => {
  return (
    <>
      <h2 className="mb-4">Notes App</h2>

      <NoteList />
      <AddNoteForm />
    </>
  );
};

export default App;
