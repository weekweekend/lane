import path from 'path';
import react from '@vitejs/plugin-react';
import legacyPlugin from '@vitejs/plugin-legacy';

export default () => ({
  base: './',
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      layouts: path.resolve(__dirname, './src/layouts'),
      pages: path.resolve(__dirname, './src/pages'),
      utils: path.resolve(__dirname, './src/utils'),
      services: path.resolve(__dirname, './src/services'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 如需自定义组件其他 token, 在此处配置
        },
      },
    },
  },

  plugins: [
    react(),
    legacyPlugin({
      targets: ['chrome 78', 'chrome 92'], // 需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
    }),
  ],

  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
    target: ['chrome78'],
    cssTarget: ['chrome78'],
  },

  server: {
    host: '0.0.0.0',
    port: 3003,
  },
});
