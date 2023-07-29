export class NotesService {
  #notes = [];

  getNotes() {
    return this.#notes;
  }

  findNoteById(id) {
    return this.#notes.find((note) => note.id === id);
  }

  addNote(note) {
    this.#notes.push(note);
    return note;
  }

  editNote(noteId, editedNote) {
    const indexToEdit = this.#notes.findIndex((note) => note.id === +noteId);
    this.#notes.splice(indexToEdit, 1, { ...this.#notes[indexToEdit], ...editedNote })
  }

  deleteNote(noteId) {
    const indexToDelete = this.#notes.findIndex((note) => note.id === +noteId);
    const deletedNote = this.#notes.splice(indexToDelete, 1);
    return deletedNote; 
  }
}