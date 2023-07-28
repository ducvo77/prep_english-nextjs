// path: ./config/api.js
module.exports = ({ env }) => ({
  responses: {
    privateAttributes: [
      "_v",
      "id",
      "created_at",
      "createdAt",
      "updatedAt",
      "publishedAt",
    ],
  },
  rest: {
    prefix: "/v1",
    defaultLimit: 100,
    maxLimit: 250,
  },
});
