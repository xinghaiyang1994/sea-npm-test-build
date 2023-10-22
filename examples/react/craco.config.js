const path = require('path');
const CracoLessPlugin = require('craco-less');
const { loaderByName } = require('@craco/craco');
const webpack = require('webpack');
const childProcess = require('child_process');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { onProxyReq } = require('./mockServer');

/** 最近提交的 hash */
let gitHash = 'nogit';
try {
  gitHash = childProcess.execSync('git rev-parse --short HEAD').toString();
} catch (error) {
  console.log('==>git error', error);
}
const lessModuleRegex = /\.module\.less$/;

console.log('==>gitHash', gitHash);
console.log('==>env', process.env.STAGE);

/** 项目运行环境 */
const projectEnv = process.env.STAGE || 'local';

/** 是否为本地开发环境 */
const isLocal = projectEnv === 'local';

/** 是否开启分析 */
const isAnalyzer = Boolean(process.env.analyzer);
console.log('==>isAnalyzer', isAnalyzer);

/* craco.config.js */
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
        // path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
        publicPath: isLocal ? webpackConfig.output.publicPath : '/',
      };

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        // 环境变量
        new webpack.DefinePlugin({
          'process.env.PROJECT_ENV': JSON.stringify(projectEnv),
          'process.env.IS_LOCAL': JSON.stringify(isLocal),
          'process.env.GIT_HASH': JSON.stringify(gitHash),
        }),
      ];

      if (!isLocal) {
        // 增加 sentry sourcemap 上传
        webpackConfig.plugins.push(
          new SentryWebpackPlugin({
            include: './build',
            release: gitHash,
          })
        );
      }

      if (isAnalyzer) {
        // 打包分析
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
      }

      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // less loader option
        lessLoaderOptions: {
          lessOptions: {
            /*
              如果项目中有使用TDesign或AntDesign组件库需要自定义主题，可以在modifyVars中添加对应less变量
          */
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
        modifyLessRule(lessRule) {
          lessRule.exclude = lessModuleRegex;
          return lessRule;
        },
        modifyLessModuleRule(lessModuleRule) {
          // configure the file suffix
          lessModuleRule.test = lessModuleRegex;

          // configure the generated local ident name
          const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'));
          cssLoader.options.modules = {
            /*
              注意这里的命名规则：
              - CRA脚手架创建的项目是可以直接使用css modules的，css文件的命名规则默认是[local]_[hash:base64:5]
              - 这里使用css modules的命名规则
          */

            localIdentName: '[local]_[hash:base64:5]',
          };

          return lessModuleRule;
        },
      },
    },
  ],
  devServer: {
    // TODO 配置代理
    proxy: {
      '/api/': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
        onProxyReq,
      },
    },
  },
};
