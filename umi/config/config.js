// ref: https://umijs.org/config/
import path from 'path';
import routes from './routes.config';
import theme from './theme';

export default {
  treeShaking: true,
  theme,
  history: 'hash',
  hash: true,
  publicPath: '/v2/',
  outputPath: 'v2',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        title: '',
        antd: true,
        dva: true,
        dll: false,
        dynamicImport: { webpackChunkName: true },
        locale: {
          default: 'zh-CN',
          baseNavigator: true,
          antd: true,
        },
        host: 'vue.sf-express.com',
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
    [
      'umi-plugin-cache-route',
      {
        keepalive: [],
      },
    ],
    [
      'umi-plugin-eslint',
      {
        ignore: true, // 启用 .eslintignore
        useEslintrc: true, // 启用 .eslintrc
      },
    ],
  ],
  cssLoaderOptions: {
    localIdentName: '[local]',
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('global.css')
      ) {
        return localName;
      }
      return localName;
    },
  },
  chainWebpack(config) {
    config.module
      .rule('less')
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .options({
        patterns: path.resolve(__dirname, '..', 'src/assets/stylesheets/common/var.less'),
        injector: 'append',
      });
  },
  routes,
  proxy: {
    '/ctrl': {
      target: 'http://',
      changeOrigin: true,
    },
    '/ext': {
      target: 'http://',
      changeOrigin: true,
    },
  },
};
