import { closeModalOnBtn, openModal } from "../common/modal.handlers.js";
import { renderNotes, submitNoteCreation, submitNoteEdition } from "./notes.handlers.js";

const noteTable = document.querySelector('.note-table');
const archivedTable = document.querySelector('.archived-table');

noteTable.addEventListener('edit-notes', () => renderNotes(noteTable, false));
archivedTable.addEventListener('edit-notes', () => renderNotes(archivedTable, true));

const createNoteBtn = document.querySelector('.create-note-btn');
const closeBtn = document.querySelectorAll(".close");
const modals = document.querySelectorAll(".modal");
const createModal = document.querySelector('.create-modal');
const archivedModal = document.querySelector('.archived-modal');
const archivedBtn = document.querySelector('.archived-btn');

createNoteBtn.addEventListener('click', () => openModal(createModal));
archivedBtn.addEventListener('click', () => {
  openModal(archivedModal);
  renderNotes(archivedTable, true);
});
modals.forEach((modal) => {
  closeBtn.forEach((btn) => btn.addEventListener('click', () => closeModalOnBtn(modal)))
})

const createForm = document.querySelector('.create-note-form');
const editForm = document.querySelector('.edit-note-form');

createForm.addEventListener('submit', submitNoteCreation);
editForm.addEventListener('submit', (event) => submitNoteEdition(editForm.id, event));