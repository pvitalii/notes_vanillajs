export class NotesService {
  #notes = [
    {
      id: 1,
      created: new Date('April 20, 2021'),
      name: 'Shopping List',
      category: 'Task',
      content: 'Tomatoes, bread',
      dates: '',
      archived: false
    },
    {
      id: 2,
      created: new Date('April 27, 2021'),
      name: 'The theory of evolution',
      category: 'Random Thought',
      content: 'The theory of evolution by natural selection was conceived independently by Charles DarwinThe theory of evolution by natural selection was conceived independently by Charles DarwinThe theory of evolution by natural selection was conceived independently by Charles DarwinThe theory of evolution by natural selection was conceived independently by Charles DarwinThe theory of evolution by natural selection was conceived independently by Charles DarwinThe theory of evolution by natural selection was conceived independently by Charles Darwin',
      dates: '',
      archived: false
    },
    {
      id: 3,
      created: new Date('May 03, 2021'),
      name: 'New Feature',
      category: 'Idea',
      content: 'Implement new feature until 5/5/2021',
      dates: '5/5/2021',
      archived: false
    },
    {
      id: 4,
      created: new Date('May 07, 2021'),
      name: 'William Gaddis',
      category: 'Random Thought',
      content: 'Power doesn`t corrupt people, people corrupt power',
      dates: '',
      archived: false
    },
    {
      id: 5,
      created: new Date('May 15, 2021'),
      name: 'Books',
      category: 'Task',
      content: 'The Lean Startup',
      dates: '',
      archived: false
    },
    {
      id: 6,
      created: new Date('May 03, 2021'),
      name: 'New Feature',
      category: 'Idea',
      content: 'Implement new feature until 5/5/2021',
      dates: '5/5/2021',
      archived: false
    },
    {
      id: 7,
      created: new Date('May 07, 2021'),
      name: 'William Gaddis',
      category: 'Random Thought',
      content: 'Power doesn`t corrupt people, people corrupt power',
      dates: '',
      archived: false
    }
  ];

  getNotes() {
    return this.#notes;
  }

  findNoteById(id) {
    return this.#notes.find((note) => note.id === +id);
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