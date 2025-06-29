/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable quotes */
const routes = (handler) => [
  {
    method: "POST",
    path: "/upload/images",
    handler: (request, h) => handler.postUploadImageHandler(request, h),
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        output: "stream",
      },
    },
  },
  {
    method: "GET",
    path: "/upload/{param*}",
    handler: {
      directory: {
        path: path.resolve(__dirname, "file"),
      },
    },
  },
];

module.exports = routes;
