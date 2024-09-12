import globals from 'globals';
import pluginJs from '@eslint/js';

export default [{ languageOptions: { globals: globals.browser } }, 
  {
    ignores: ["node_modules/", "package-lock.json", "package.json", "babel.config.json", "webpack.config.cjs"]
  },
  pluginJs.configs.recommended];