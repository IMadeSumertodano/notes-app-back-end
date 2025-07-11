/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable quotes */
class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = async (request, h) => {
      const { data } = request.payload;
      this._validator.validateImageHeaders(data.hapi.headers);

      const fileLocation = await this._service.writeFile(data, data.hapi);

      const response = h.response({
        status: "success",
        data: {
          fileLocation,
        },
      });
      response.code(201);
      return response;
    };
  }
}

module.exports = UploadsHandler;
