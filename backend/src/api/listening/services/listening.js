'use strict';

/**
 * listening service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::listening.listening');
