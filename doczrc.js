import json from './dist/package.json';

export default {
  title: `Version ${json.version}`,
  native: true,
  typescript: true,
  codeSandbox: false,
  base: `/${json.name}/`,
}
