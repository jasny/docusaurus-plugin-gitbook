/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Supported Blocks',
      items: [
        'blocks/hints',
        'blocks/tabs',
        'blocks/stepper',
        'blocks/columns',
        'blocks/code',
        'blocks/embeds',
        'blocks/files',
        'blocks/buttons',
        'blocks/cards',
        'blocks/icons',
        'blocks/openapi',
      ],
    },
    'customization',
  ],
};

export default sidebars;
