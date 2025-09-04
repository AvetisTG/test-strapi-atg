import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // Register the custom badge color field
  strapi.customFields.register({
    name: 'badgeColor',
    plugin: 'color-badge',
    type: 'string',
    inputSize: {
      default: 4,
      isResizable: true,
    },
  });
};

export default register;
