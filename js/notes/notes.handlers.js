import { dateParse } from "../common/date-parse.js";
import { openEditModal } from "../common/modal.handlers.js";
import { editNotesEvent } from "../events/edit-notes.event.js";
import { NotesService } from "./notes.service.js";

const notesService = new NotesService();

const noteTable = document.querySelector('.note-table');
const archivedTable = document.querySelector('.archived-table');
const statTable = document.querySelector('.stat-table')

export function submitNoteCreation(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  notesService.addNote(
    {
      ...formProps,
      id: new Date().getTime(),
      created: new Date(),
      dates: dateParse(formProps.content)?.join(', ') ?? ' ',
      archived: false
    });
  noteTable.dispatchEvent(editNotesEvent);
}

function addListenersOnNotes() {
  const editNoteBtn = document.querySelectorAll('.edit-note-btn');
  const archiveNoteBtn = document.querySelectorAll('.archive-note-btn');
  const deleteNoteBtn = document.querySelectorAll('.delete-note-btn');
  const editForm = document.querySelector('.edit-note-form');

  editNoteBtn.forEach((editBtn) => {
    editBtn.addEventListener('click', (event) => {
      const id = +event.currentTarget.id;
      openEditModal(notesService.findNoteById(id));
      editForm.id = id;
    });
  })

  archiveNoteBtn.forEach((archiveBtn) => {
    archiveBtn.addEventListener('click', (event) => {
      const noteId = +event.currentTarget.id;
      archiveNote(notesService.findNoteById(noteId));
    });
  })

  deleteNoteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
      const noteId = +event.currentTarget.id;
      deleteNote(notesService.findNoteById(noteId));
    })
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

export function archiveNote(note) {
  notesService.editNote(note.id, {archived: !note.archived});
  if(note.archived) {
    noteTable.dispatchEvent(editNotesEvent);
    archivedTable.dispatchEvent(editNotesEvent);
  } else {
    noteTable.dispatchEvent(editNotesEvent);
  }
}

export function deleteNote(note) {
  notesService.deleteNote(note.id)
  if(note.archived) {
    archivedTable.dispatchEvent(editNotesEvent);
  } else {
    noteTable.dispatchEvent(editNotesEvent);
  }
}

export function renderNotes(noteTable, isArchived) {
  const notes = notesService.getNotes();
  const tableHeader = noteTable.querySelector('.table-header');
  const rows = notes.map((note) => {
    if(note.archived !== isArchived) return '';
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td class="name-row"><img src="img/${note.category.replaceAll(/ /ig, '_')}.svg"/>${note.name}</td>
      <td>${note.created.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
      <td>${note.category}</td>
      <td>${note.content}</td>
      <td>${note.dates}</td>
      <td>
        <div class="icon-row">
          <button style="display: ${isArchived ? "none" : "block"}" id="${note.id}" class="icon-btn edit-note-btn"><img src="img/edit.svg" alt="edit"/></button>
          <button id="${note.id}" class="icon-btn archive-note-btn"><img src="img/grey_archive.svg" alt="archive"/></button>
          <button id="${note.id}" class="icon-btn delete-note-btn"><img src="img/grey_delete.svg" alt="delete"/></button>
        </div>
      </td>`
    return tableRow
  })
  noteTable.replaceChildren(tableHeader, ...rows);
  if(noteTable.children.length > 1) {
    addListenersOnNotes();
  }
}

export function renderStat() {
  const tableHeader = statTable.querySelector('.stat-header');
  const notes = notesService.getNotes();
  const statInfo = notes.map((note) => { return { category: note.category, archived: note.archived }});
  const allCategories = ['Task', 'Random Thought', 'Idea'];
  const rows = allCategories.map((category) => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td class="name-row"><img src="img/${category.replaceAll(/ /ig, '_')}.svg"/>${category}</td>
      <td>${statInfo.filter((info) => info.category === category && !info.archived).length}</td>
      <td>${statInfo.filter((info) => info.category === category && info.archived).length}</td>
    `
    return tableRow;
  })
  statTable.replaceChildren(tableHeader, ...rows);
}