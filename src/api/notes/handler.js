/* eslint-disable linebreak-style */
/* eslint-disable quotes */
class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = async (request, h) => {
      this._validator.validateNotePayload(request.payload);
      const { title = "untitled", body, tags } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      const noteId = await this._service.addNote({
        title,
        body,
        tags,
        owner: credentialId,
      });

      const response = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: { noteId },
      });
      response.code(201);
      return response;
    };

    this.getNotesHandler = async (request) => {
      const { id: credentialId } = request.auth.credentials;
      const notes = await this._service.getNotes(credentialId);
      return {
        status: "success",
        data: { notes },
      };
    };

    this.getNoteByIdHandler = async (request) => {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyNoteAccess(id, credentialId);
      const note = await this._service.getNoteById(id);

      return {
        status: "success",
        data: { note },
      };
    };

    this.putNoteByIdHandler = async (request) => {
      this._validator.validateNotePayload(request.payload);
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyNoteAccess(id, credentialId);
      await this._service.editNoteById(id, request.payload);

      return {
        status: "success",
        message: "Catatan berhasil diperbarui",
      };
    };

    this.deleteNoteByIdHandler = async (request) => {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyNoteOwner(id, credentialId);
      await this._service.deleteNoteById(id);

      return {
        status: "success",
        message: "Catatan berhasil dihapus",
      };
    };
  }
}

module.exports = NotesHandler;
