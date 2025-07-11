/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const ClientError = require("../../exceptions/ClientError");

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = async (request, h) => {
      this._validator.validateUserPayload(request.payload);
      const { username, password, fullname } = request.payload;

      const userId = await this._service.addUser({
        username,
        password,
        fullname,
      });

      const response = h.response({
        status: "success",
        message: "User berhasil ditambahkan",
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    };

    this.getUserByIdHandler = async (request) => {
      const { id } = request.params;
      const user = await this._service.getUserById(id);

      return {
        status: "success",
        data: {
          user,
        },
      };
    };

    this.getUsersByUsernameHandler = async (request, h) => {
      try {
        const { username = "" } = request.query;
        const users = await this._service.getUsersByUsername(username);
        return {
          status: "success",
          data: {
            users,
          },
        };
      } catch (error) {
        if (error instanceof ClientError) {
          const response = h.response({
            status: "fail",
            message: error.message,
          });
          response.code(error.statusCode);
          return response;
        }

        // Server ERROR!
        const response = h.response({
          status: "error",
          message: "Maaf, terjadi kegagalan pada server kami.",
        });
        response.code(500);
        console.error(error);
        return response;
      }
    };
  }
}

module.exports = UsersHandler;
