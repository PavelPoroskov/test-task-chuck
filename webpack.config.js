const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postcssNormalize = require('postcss-normalize');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');

const shouldUseSourceMap = true;

const appDirectory = path.resolve(__dirname);

const babelLoaderConfiguration = {
  test: /\.jsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [path.resolve(appDirectory, 'src')],
  use: ['babel-loader', 'eslint-loader'],
};

module.exports = (webpackEnv, options) => {
  const isEnvDevelopment = options.mode === 'development';
  const isEnvProduction = options.mode === 'production';

  const envKeys = Object.keys(webpackEnv || {}).reduce((acc, next) => {
    acc[`process.env.${next}`] = JSON.stringify(webpackEnv[next]);
    return acc;
  }, {});

  const publicPath = isEnvDevelopment ? '/' : '.'; 

  // Some apps do not use client-side routing with pushState.
  // For these, "homepage" can be set to "." to enable relative asset paths.
  const shouldUseRelativeAssetPaths = publicPath === './';

  const cssLoaderConfiguration = {
    test: /\.css$/,
    use: [
      isEnvDevelopment && require.resolve('style-loader'),
      // 'style-loader',
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            postcssFlexbugsFixes,
            postcssPresetEnv({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean),
    sideEffects: true,
  };

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: [
      path.resolve(appDirectory, 'src/index.js'),
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(appDirectory, 'build'),
      publicPath,
    },
    devServer: {
      contentBase: './build',
      historyApiFallback: true,
    },

    module: {
      rules: [
        babelLoaderConfiguration,
        cssLoaderConfiguration,
      ],
    },

    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'src')],
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      isEnvProduction
      && new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: 'public/index.html',
          },
          options.mode === 'production'
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
            : undefined,
        ),
      ),

      new webpack.DefinePlugin(envKeys),

      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ].filter(Boolean),
  };
};
