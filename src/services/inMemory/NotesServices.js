const { nanoid } = require("nanoid");

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createAt,
      updateAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new Error("Catatan gagal ditambahkan");
    }
    return id;
  }

  getNotes() {
    return this._notes;
  }
}
