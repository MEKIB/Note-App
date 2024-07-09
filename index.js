document.addEventListener("DOMContentLoaded", () => {
    const btnEl = document.getElementById("createnote");
    const appEl = document.getElementById("noteapp");

    // Load existing notes on page load
    const notes = getNotes();
    notes.forEach(note => {
        const noteEl = createNote(note.id, note.newContent);
        appEl.insertBefore(noteEl, btnEl);
    });

    btnEl.addEventListener("click", note);

    function note() {
        console.log("Create note button clicked"); // Debug statement
        const notes = getNotes();
        const newObject = {
            id: (Math.random() * 1000).toFixed(),
            newContent: ""
        };
        const create = createNote(newObject.id, newObject.newContent);
        appEl.insertBefore(create, btnEl);
        notes.push(newObject);
        saveNotes(notes);
    }

    function createNote(id, newContent) {
        const note1 = document.createElement("textarea");
        note1.classList.add("textnote");
        note1.placeholder = "empty note";
        note1.value = newContent;
        note1.addEventListener("dblclick", () => {
            const warn = confirm("Do you want to delete this note?");
            if (warn) {
                deleteNote(id, note1);
            }
        });
        note1.addEventListener("input", () => {
            updateNote(id, note1.value);
        });
        return note1;
    }

    function deleteNote(id, noteElement) {
        const notes = getNotes().filter(note => note.id !== id);
        saveNotes(notes);
        appEl.removeChild(noteElement);
    }

    function updateNote(id, newValue) {
        const notes = getNotes();
        const targetNote = notes.find(note => note.id === id);
        if (targetNote) {
            targetNote.newContent = newValue;
            saveNotes(notes);
        }
    }

    function saveNotes(notes) {
        localStorage.setItem("note-app", JSON.stringify(notes));
    }

    function getNotes() {
        return JSON.parse(localStorage.getItem("note-app") || "[]");
    }
});
