import path from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default () => ({
  base: 'https://eele-1251241442.cos.ap-shanghai.myqcloud.com/dist/',
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

  plugins: [react(), visualizer({ open: true })],

  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // //最小拆包
        // manualChunks: (id) => {
        //   if (id.includes('node_modules')) {
        //     console.log(id.toString().split('node_modules/')[1].split('/'));
        //     //return 的是[name]
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        // }, // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        // entryFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
        // chunkFileNames: 'js/[name].[hash].js', // 用于输出静态资源的命名，[ext]表示文件扩展名
        // assetFileNames: '[ext]/[name].[hash].[ext]',
        manualChunks: {
          'react-dom': ['react-dom'],
          'antd-mobile': ['antd-mobile'],
        },
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: '[name][extname]',
      },
    },
    terserOptions: {
      minify: 'terser',
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3003,
  },
});
