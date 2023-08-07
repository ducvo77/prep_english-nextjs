'use strict';

/**
 * part service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::part.part');
