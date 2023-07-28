'use strict';

/**
 * speaking-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::speaking-test.speaking-test');
