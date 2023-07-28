'use strict';

/**
 * reading-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::reading-test.reading-test');
