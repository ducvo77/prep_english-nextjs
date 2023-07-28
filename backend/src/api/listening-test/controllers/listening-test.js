'use strict';

/**
 * listening-test controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::listening-test.listening-test');
