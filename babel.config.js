module.exports = function config(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ];
  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ];

  return {
    presets,
    plugins,
  };
};
