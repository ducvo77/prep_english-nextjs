'use strict';

/**
 * writing-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::writing-test.writing-test');
