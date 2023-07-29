import { dateParse } from "../common/date-parse.js";
import { openEditModal } from "../common/modal.handlers.js";
import { editNotesEvent } from "../events/edit-notes.event.js";
import { NotesService } from "./notes.service.js";

const notesService = new NotesService();

const noteTable = document.querySelector('.note-table');

export function submitNoteCreation(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  notesService.addNote(
    {
      ...formProps,
      id: new Date().getTime(),
      created: new Date(),
      dates: dateParse(formProps.content)?.join(', ') ?? ' '
    });
  noteTable.dispatchEvent(editNotesEvent);
}

function addListenersOnNotes() {
  const editNoteBtn = document.querySelectorAll('.edit-note-btn');
  const editForm = document.querySelector('.edit-note-form');

  editNoteBtn.forEach((editBtn) => {
    editBtn.addEventListener('click', (event) => {
      const id = +event.target.parentNode.id;
      openEditModal(notesService.findNoteById(id));
      editForm.id = id;
    });
  })
}

export function submitNoteEdition(id, event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  notesService.editNote(id, {
    ...formProps,
    dates: dateParse(formProps.content)?.join(', ') ?? ' '
  })
  noteTable.dispatchEvent(editNotesEvent);
}

export function renderNotes() {
  const notes = notesService.getNotes();
  const tableHeader = noteTable.querySelector('.table-header')
  const rows = notes.map((note) => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td class="name-row"><img src="img/${note.category.replaceAll(/ /ig, '_')}.svg"/>${note.name}</td>
      <td>${note.created.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
      <td>${note.category}</td>
      <td>${note.content}</td>
      <td>${note.dates}</td>
      <td>
        <div class="icon-row">
          <button id="${note.id}" class="icon-btn edit-note-btn"><img src="img/edit.svg" alt="edit"/></button>
          <button id="${note.id}" class="icon-btn"><img src="img/grey_archive.svg" alt="archive"/></button>
          <button id="${note.id}" class="icon-btn"><img src="img/grey_delete.svg" alt="delete"/></button>
        </div>
      </td>`
    return tableRow
  })
  noteTable.replaceChildren(tableHeader, ...rows);
  if(noteTable.children.length > 1) {
    addListenersOnNotes();
  }
}