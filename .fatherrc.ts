import { defineConfig } from 'father';

export default defineConfig({
  esm: {},
  umd: {
    name: 'fatherDemo',
    entry: 'src/index', // 默认构建入口文件
  },
});
