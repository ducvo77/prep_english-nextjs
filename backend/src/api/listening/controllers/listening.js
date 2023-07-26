'use strict';

/**
 * listening controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::listening.listening');
