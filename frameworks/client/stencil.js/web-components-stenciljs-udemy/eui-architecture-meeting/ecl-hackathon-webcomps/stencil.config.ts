import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'eui-webcomponents',
  globalStyle: 'src/assets/css/ecl-ec-preset-full.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
