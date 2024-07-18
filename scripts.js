document.addEventListener('DOMContentLoaded', () => {
    const noteSection = document.getElementById('noteSection');
    const searchSection = document.getElementById('searchSection');
    const labelViewSection = document.getElementById('labelViewSection');
    const archivedSection = document.getElementById('archivedSection');
    const trashSection = document.getElementById('trashSection');
    const noteModal = document.getElementById('noteModal');
    const noteContent = document.getElementById('noteContent');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const createNoteBtn = document.getElementById('createNoteBtn');
    const searchBtn = document.getElementById('searchBtn');
    const labelViewBtn = document.getElementById('labelViewBtn');
    const archivedNotesBtn = document.getElementById('archivedNotesBtn');
    const trashNotesBtn = document.getElementById('trashNotesBtn');
    
    let notes = [];

    createNoteBtn.addEventListener('click', () => {
        noteModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        noteModal.classList.add('hidden');
    });

    saveNoteBtn.addEventListener('click', () => {
        const content = noteContent.value.trim();
        if (content) {
            const newNote = {
                id: Date.now(),
                content: content,
                tags: [],
                archived: false,
                trashed: false,
                backgroundColor: '#ffffff'
            };
            notes.push(newNote);
            renderNotes();
            noteContent.value = '';
            noteModal.classList.add('hidden');
        }
    });

    searchBtn.addEventListener('click', () => {
        searchSection.classList.toggle('hidden');
        renderSearchResults();
    });

    labelViewBtn.addEventListener('click', () => {
        labelViewSection.classList.toggle('hidden');
        renderLabelView();
    });

    archivedNotesBtn.addEventListener('click', () => {
        archivedSection.classList.toggle('hidden');
        renderArchivedNotes();
    });

    trashNotesBtn.addEventListener('click', () => {
        trashSection.classList.toggle('hidden');
        renderTrashNotes();
    });

    function renderNotes() {
        noteSection.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <div class="note-content">${note.content}</div>
                <div class="note-controls">
                    <button onclick="toggleArchive(${note.id})">${note.archived ? 'Unarchive' : 'Archive'}</button>
                    <button onclick="toggleTrash(${note.id})">${note.trashed ? 'Restore' : 'Delete'}</button>
                </div>
            `;
            noteElement.style.backgroundColor = note.backgroundColor;
            noteSection.appendChild(noteElement);
        });
    }

    function renderSearchResults() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const searchResults = notes.filter(note => note.content.toLowerCase().includes(searchInput));
        const searchResultsDiv = document.getElementById('searchResults');
        searchResultsDiv.innerHTML = '';
        searchResults.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <div class="note-content">${note.content}</div>
                <div class="note-controls">
                    <button onclick="toggleArchive(${note.id})">${note.archived ? 'Unarchive' : 'Archive'}</button>
                    <button onclick="toggleTrash(${note.id})">${note.trashed ? 'Restore' : 'Delete'}</button>
                </div>
            `;
            searchResultsDiv.appendChild(noteElement);
        });
    }

    function renderLabelView() {
        const labelResultsDiv = document.getElementById('labelResults');
        labelResultsDiv.innerHTML = '';
        const taggedNotes = notes.filter(note => note.tags.length > 0);
        taggedNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <div class="note-content">${note.content}</div>
                <div class="note-controls">
                    <button onclick="toggleArchive(${note.id})">${note.archived ? 'Unarchive' : 'Archive'}</button>
                    <button onclick="toggleTrash(${note.id})">${note.trashed ? 'Restore' : 'Delete'}</button>
                </div>
            `;
            labelResultsDiv.appendChild(noteElement);
        });
    }

    function renderArchivedNotes() {
        const archivedNotesDiv = document.getElementById('archivedNotes');
        archivedNotesDiv.innerHTML = '';
        const archivedNotes = notes.filter(note => note.archived);
        archivedNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <div class="note-content">${note.content}</div>
                <div class="note-controls">
                    <button onclick="toggleArchive(${note.id})">${note.archived ? 'Unarchive' : 'Archive'}</button>
                    <button onclick="toggleTrash(${note.id})">${note.trashed ? 'Restore' : 'Delete'}</button>
                </div>
            `;
            archivedNotesDiv.appendChild(noteElement);
        });
    }

    function renderTrashNotes() {
        const trashNotesDiv = document.getElementById('trashNotes');
        trashNotesDiv.innerHTML = '';
        const trashNotes = notes.filter(note => note.trashed);
        trashNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <div class="note-content">${note.content}</div>
                <div class="note-controls">
                    <button onclick="toggleArchive(${note.id})">${note.archived ? 'Unarchive' : 'Archive'}</button>
                    <button onclick="toggleTrash(${note.id})">${note.trashed ? 'Restore' : 'Delete'}</button>
                </div>
            `;
            trashNotesDiv.appendChild(noteElement);
        });
    }

    function toggleArchive(noteId) {
        const noteIndex = notes.findIndex(note => note.id === noteId);
        if (noteIndex !== -1) {
            notes[noteIndex].archived = !notes[noteIndex].archived;
            renderNotes();
            renderArchivedNotes();
        }
    }

    function toggleTrash(noteId) {
        const noteIndex = notes.findIndex(note => note.id === noteId);
        if (noteIndex !== -1) {
            notes[noteIndex].trashed = !notes[noteIndex].trashed;
            renderNotes();
            renderTrashNotes();
        }
    }

    // Initial render
    renderNotes();
});
