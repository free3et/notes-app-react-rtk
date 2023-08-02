import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

enum NoteCategory {
  Task = "Task",
  RandomThought = "Random Thought",
  Idea = "Idea",
  Quote = "Quote",
}

export interface Note {
  id: number;
  name: string;
  timeOfCreation: string;
  category: NoteCategory | string;
  noteContent: string;
  archived: boolean;
}

interface Notes {
  activeNotes: Note[];
  archiveNotes: Note[];
}

const initialState: Notes = {
  activeNotes: [
    {
      id: 1,
      name: "Shopping list",
      timeOfCreation: "2023-07-25T12:00:00Z",
      category: "Task",
      noteContent: "Tomatoes, bread",
      archived: false,
    },
    {
      id: 2,
      name: "The theory of evolution",
      timeOfCreation: "2023-07-21T12:00:00Z",
      category: "Random Thought",
      noteContent:
        "In biology, evolution is the change in the characteristics of a species over several generations and relies on the process of natural selection.",
      archived: false,
    },
    {
      id: 3,
      name: "New Feauture",
      timeOfCreation: "2023-07-14T12:00:00Z",
      category: "Idea",
      noteContent: "Implement new feautures to my application",
      archived: false,
    },
    {
      id: 4,
      name: "William Gaddis",
      timeOfCreation: "2023-06-25T12:00:00Z",
      category: "Quote",
      noteContent: "Power does not corrupt people; people corrupt power.",
      archived: false,
    },
    {
      id: 5,
      name: "Tattoo",
      timeOfCreation: "2023-06-15T12:00:00Z",
      category: "Task",
      noteContent:
        "I am going to make an appointment with a tattoo artist on 4/06/2023, I postponed it from 5/06/2023",
      archived: false,
    },
    {
      id: 6,
      name: "Books",
      timeOfCreation: "2023-05-28T12:00:00Z",
      category: "Task",
      noteContent: "Read David Flanagan 'JavaScript: The Definitive Guide'",
      archived: false,
    },
    {
      id: 7,
      name: "Dantist",
      timeOfCreation: "2023-07-25T12:00:00Z",
      category: "Task",
      noteContent:
        "I/’m gonna have a dentist appointment on the 3/05/2023, I moved it from 5/05/2023",
      archived: false,
    },
  ],
  archiveNotes: [
    {
      id: 1,
      name: "Learn JS",
      timeOfCreation: "2022-07-25T12:00:00Z",
      category: "Task",
      noteContent: "Learn JS, React, Redux",
      archived: true,
    },
  ],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.activeNotes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.activeNotes = state.activeNotes.filter(
        (note: Note) => note.id !== action.payload
      );
    },

    editNote: (state, action: PayloadAction<Note>) => {
      const editedNote = action.payload;

      const index = state.activeNotes.findIndex(
        (note) => note.id === editedNote.id
      );
      if (index !== -1) {
        state.activeNotes[index] = editedNote;
      }
    },

    archiveNote: (state, action: PayloadAction<number>) => {
      const archiveNote = state.activeNotes.find(
        (note) => note.id === action.payload
      );
      if (archiveNote) {
        archiveNote.archived = true;
        state.archiveNotes.push(archiveNote);
        state.activeNotes = state.activeNotes.filter(
          (note) => note.id !== action.payload
        );
      }
    },

    unarchiveNote: (state, action: PayloadAction<number>) => {
      const unarchiveNote = state.archiveNotes.find(
        (note) => note.id === action.payload
      );
      if (unarchiveNote) {
        unarchiveNote.archived = false;
        state.activeNotes.push(unarchiveNote);
        state.archiveNotes = state.archiveNotes.filter(
          (note) => note.id !== action.payload
        );
      }
    },
  },
});

export const { addNote, editNote, deleteNote, archiveNote, unarchiveNote } =
  notesSlice.actions;

export const selectActiveNotes = (state: RootState) => state.notes.activeNotes;
export const selectArchiveNotes = (state: RootState) =>
  state.notes.archiveNotes;

export default notesSlice.reducer;
