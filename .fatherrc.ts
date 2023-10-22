import { defineConfig } from 'father';

export default defineConfig({
  esm: {},
  umd: {
    // 挂载在 window 上的全局变量名称
    name: 'TransparentVideoClass',
    chainWebpack: (memo) => {
      // 只导出 TransparentVideoClass, 即 window 上有 TransparentVideoClass
      memo.output.libraryExport('TransparentVideoClass');
      return memo;
    },
    entry: 'src/index', // 默认构建入口文件
  },
});
