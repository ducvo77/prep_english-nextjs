'use strict';

/**
 * listening-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::listening-test.listening-test');
