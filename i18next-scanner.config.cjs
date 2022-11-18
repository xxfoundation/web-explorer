module.exports = {
  input: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**'
  ],
  options: {
    debug: false, // true to print config
    defaultLng: 'en',
    func: {
      extensions: ['.tsx', '.ts'],
      list: ['t', 'i18next.t', 'i18n.t']
    },
    keySeparator: false, // key separator
    lngs: ['en'],
    nsSeparator: false, // namespace separator
    resource: {
      jsonIndent: 2,
      lineEnding: '\n',
      loadPath: 'public/locales/i18n/{{lng}}/index.json',
      savePath: 'public/locales/i18n/{{lng}}/index.json'
    },
    trans: {
      component: 'Trans'
    }
  },
  output: './'
};
