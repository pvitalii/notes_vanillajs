import { closeModalOnBtn, openModal, openEditModal } from "../common/modal.handlers.js";
import { editNotesEvent } from "../events/edit-notes.event.js";
import { renderNotes, submitNoteCreation, submitNoteEdition, renderStat, archiveNote, deleteNote, notesService } from "./notes.handlers.js";

const noteTable = document.querySelector('.note-table');
const archivedTable = document.querySelector('.archived-table');

noteTable.addEventListener('edit-notes', () => { 
  renderNotes(noteTable, false);
  renderNotes(archivedTable, true);
  renderStat();
  addListenersOnNotes();
});
noteTable.dispatchEvent(editNotesEvent);

const createNoteBtn = document.querySelector('.create-note-btn');
const closeBtn = document.querySelectorAll(".close");
const modals = document.querySelectorAll(".modal");
const createModal = document.querySelector('.create-modal');
const archivedModal = document.querySelector('.archived-modal');
const archivedBtn = document.querySelector('.archived-btn');

createNoteBtn.addEventListener('click', () => openModal(createModal));
archivedBtn.addEventListener('click', () => {
  openModal(archivedModal);
});
modals.forEach((modal) => {
  closeBtn.forEach((btn) => btn.addEventListener('click', () => closeModalOnBtn(modal)))
})

const createForm = document.querySelector('.create-note-form');
const editForm = document.querySelector('.edit-note-form');

createForm.addEventListener('submit', submitNoteCreation);
editForm.addEventListener('submit', (event) => submitNoteEdition(editForm.dataset.noteId, event));

function addListenersOnNotes() {
  const editNoteBtn = document.querySelectorAll('.edit-note-btn');
  const archiveNoteBtn = document.querySelectorAll('.archive-note-btn');
  const deleteNoteBtn = document.querySelectorAll('.delete-note-btn');
  const editForm = document.querySelector('.edit-note-form');

  editNoteBtn.forEach((editBtn) => {
    editBtn.addEventListener('click', (event) => {
      const id = event.currentTarget.dataset.noteId;
      openEditModal(notesService.findNoteById(id));
      editForm.dataset.noteId = id;
    });
  })

  archiveNoteBtn.forEach((archiveBtn) => {
    archiveBtn.addEventListener('click', (event) => {
      const noteId = event.currentTarget.dataset.noteId;
      archiveNote(notesService.findNoteById(noteId));
    });
  })

  deleteNoteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
      deleteNote(event.currentTarget.dataset.noteId);
    })
  })
}