"use strict";

/**
 * test controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::test.test");

// ({ strapi }) => ({
//   async findOne(ctx) {
//     const { slug } = ctx.params;
//     const entity = await strapi.db.query("api::test.test").findOne({
//       where: { slug },
//     });
//     const sanitizedEntity = await this.sanitizeOutput(entity);
//     return this.transformResponse(sanitizedEntity);
//   },
// });
