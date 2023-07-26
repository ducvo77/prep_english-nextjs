'use strict';

/**
 * writing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::writing.writing');
