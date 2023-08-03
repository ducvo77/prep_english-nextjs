'use strict';

/**
 * training-history service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::training-history.training-history');
