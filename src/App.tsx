import { AddNoteForm } from "./components/AddNoteForm";
import { ActiveNoteList } from "./components/activeNoteList";
import { ArchiveNoteList } from "./components/ArchiveNoteList";

const App = () => {
  return (
    <>
      <h2 className="mb-4">Notes App</h2>

      <ActiveNoteList />
      <AddNoteForm />
      <ArchiveNoteList />
    </>
  );
};

export default App;
