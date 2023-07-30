import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface Note {
  id: number;
  name: string;
  timeOfCreation: string;
  category: string;
  noteContent: string;
  datesMentioned: string;
  archived: boolean;
}

interface Notes {
  notes: Note[];
}

const initialState: Notes = {
  notes: [
    {
      id: 1,
      name: "Shopping list",
      timeOfCreation: "2023-07-25T12:00:00Z",
      category: "Task",
      noteContent: "Tomatoes, bread",
      datesMentioned: "",
      archived: false,
    },
    {
      id: 2,
      name: "The theory of evolution",
      timeOfCreation: "2023-07-21T12:00:00Z",
      category: "Random Thought",
      noteContent:
        "In biology, evolution is the change in the characteristics of a species over several generations and relies on the process of natural selection.",
      datesMentioned: "",
      archived: false,
    },
    {
      id: 3,
      name: "New Feauture",
      timeOfCreation: "2023-07-14T12:00:00Z",
      category: "Idea",
      noteContent: "Implement new feautures to my application",
      datesMentioned: "",
      archived: false,
    },
    {
      id: 4,
      name: "William Gaddis",
      timeOfCreation: "2023-06-25T12:00:00Z",
      category: "Quote",
      noteContent: "Power does not corrupt people; people corrupt power.",
      datesMentioned: "",
      archived: false,
    },
    {
      id: 5,
      name: "Tattoo",
      timeOfCreation: "2023-06-15T12:00:00Z",
      category: "Task",
      noteContent:
        "I am going to make an appointment with a tattoo artist on 4/06/2023, I postponed it from 5/06/2023",
      datesMentioned: "",
      archived: false,
    },
    {
      id: 6,
      name: "Books",
      timeOfCreation: "2023-05-28T12:00:00Z",
      category: "Task",
      noteContent: "Read David Flanagan 'JavaScript: The Definitive Guide'",
      datesMentioned: "",
      archived: false,
    },
    {
      id: 7,
      name: "Dantist",
      timeOfCreation: "2023-07-25T12:00:00Z",
      category: "Task",
      noteContent:
        "I/’m gonna have a dentist appointment on the 3/05/2023, I moved it from 5/05/2023",
      datesMentioned: "",
      archived: false,
    },
  ],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(
        (note: Note) => note.id !== action.payload
      );
    },
    /* editNote: (state, action: PayloadAction<number>) => {

    },

    archiveNote: (state, action: PayloadAction<number>) => {

    },
    unarchiveNote: (state, action: PayloadAction<number>) => {

    }, */
  },
});

export const { addNote, deleteNote } = notesSlice.actions;

export const selectAllNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer;

/* import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface Note {
  id: number;
  name: string;
  timeOfCreation: string;
  category: string;
  noteContent: string;
  datesMentioned: string[];
  archived: boolean;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [] // Add your initial notes here if needed
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    archiveNote: (state, action: PayloadAction<number>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state.notes[index].archived = true;
      }
    },
    unarchiveNote: (state, action: PayloadAction<number>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state.notes[index].archived = false;
      }
    },
  },
});

export const { addNote, deleteNote, editNote, archiveNote, unarchiveNote } = notesSlice.actions;

export const selectAllNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer; */
