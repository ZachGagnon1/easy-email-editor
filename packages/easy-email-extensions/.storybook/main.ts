import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  'stories': [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  'addons': [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  'framework': '@storybook/react-vite',
  async viteFinal(config) {
    return mergeConfig(config, {
      // Ensure Vite 8 handles the MUI v9 imports correctly
      optimizeDeps: {
        include: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
      },
    });
  },
};
export default config;