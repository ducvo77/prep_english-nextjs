'use strict';

/**
 * listening-test router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::listening-test.listening-test');
