import { Fragment } from "react";
import { ActiveNoteList } from "./components/ActiveNoteList";
import { AddNoteForm } from "./components/AddNoteForm";
import { NoteSummaryTable } from "./components/NoteSummaryTable";

const App = () => {
  return (
    <Fragment>
      <h2 className="md:text-xl text-3xl font-bold mt-8 md:mt-5">Notes App</h2>
      <ActiveNoteList />
      <AddNoteForm />
      <NoteSummaryTable />
    </Fragment>
  );
};

export default App;
