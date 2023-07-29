import { closeModalOnBtn, openCreateModal } from "../common/modal.handlers.js";
import { renderNotes, submitNoteCreation, submitNoteEdition } from "./notes.handlers.js";

const noteTable = document.querySelector('.note-table');

noteTable.addEventListener('edit-notes', renderNotes)

const createNoteBtn = document.querySelector('.create-note-btn');
const closeBtn = document.querySelectorAll(".close");
const modals = document.querySelectorAll(".modal");

createNoteBtn.addEventListener('click', () => openCreateModal());
modals.forEach((modal) => {
  closeBtn.forEach((btn) => btn.addEventListener('click', () => closeModalOnBtn(modal)))
})

const createForm = document.querySelector('.create-note-form');
const editForm = document.querySelector('.edit-note-form');

createForm.addEventListener('submit', submitNoteCreation);
editForm.addEventListener('submit', (event) => submitNoteEdition(editForm.id, event));