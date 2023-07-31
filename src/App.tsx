import { ActiveNoteList } from "./components/ActiveNoteList";
import { AddNoteForm } from "./components/AddNoteForm";
//import { NoteSummaryTable } from "./components/NoteSummaryTable";

import { ArchiveNoteList } from "./components/ArchiveNoteList";

const App = () => {
  return (
    <>
      <h2 className="mb-4">Notes App</h2>

      <ActiveNoteList />
      <AddNoteForm />
      {/*    <NoteSummaryTable /> */}
      <ArchiveNoteList />
    </>
  );
};

export default App;
