'use strict';

/**
 * test-kit service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-kit.test-kit');
