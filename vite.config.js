import path from 'path';
import react from '@vitejs/plugin-react';

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

  plugins: [react()],

  build: {
    cssCodeSplit: false,
  },

  server: {
    host: '0.0.0.0',
    port: 3003,
  },
});
