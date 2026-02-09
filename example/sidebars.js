/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Blocks',
      items: [
        'blocks/hints',
        'blocks/tabs',
        'blocks/stepper',
        'blocks/columns',
        'blocks/code',
        'blocks/embeds',
        'blocks/files',
        'blocks/buttons-and-cards',
      ],
    },
  ],
};

export default sidebars;
