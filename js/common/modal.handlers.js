const createModal = document.querySelector('.create-modal');
const editModal = document.querySelector('.edit-modal');

export function openCreateModal () {
  createModal.style.display = "block";
}

function populateOldValues(note) {
  const nameInput = document.querySelector('.edit-name-input');
  const contentInput = document.querySelector('.edit-content-input');
  const categorySelect = document.querySelector('.edit-category-select');

  nameInput.value = note.name;
  contentInput.value = note.content;
  categorySelect.children.namedItem(note.category).selected = true;
}

export function openEditModal(note) {
  editModal.style.display = "block";
  populateOldValues(note);
}

export function closeModalOnBtn (modal) {
  modal.style.display = "none";
}