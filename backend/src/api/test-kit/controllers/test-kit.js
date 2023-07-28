'use strict';

/**
 * test-kit controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::test-kit.test-kit');
