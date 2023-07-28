'use strict';

/**
 * test-kit router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::test-kit.test-kit');
