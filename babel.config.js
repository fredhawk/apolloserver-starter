module.exports = api => {
  api.cache(false)
  return {
    presets: [['@babel/preset-env', { modules: 'auto' }]],
    plugins: ['@babel/plugin-syntax-dynamic-import'],
  }
}
