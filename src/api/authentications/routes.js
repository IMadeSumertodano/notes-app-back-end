/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const routes = (handler) => [
  {
    method: "POST",
    path: "/authentications",
    handler: (request, h) => handler.postAuthenticationHandler(request, h),
  },
  {
    method: "PUT",
    path: "/authentications",
    handler: (request, h) => handler.putAuthenticationHandler(request, h),
  },
  {
    method: "DELETE",
    path: "/authentications",
    handler: (request, h) => handler.deleteAuthenticationHandler(request, h),
  },
];

module.exports = routes;
