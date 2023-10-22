import { Suspense } from 'react';
import { Provider } from 'mobx-react';
import { ConfigProvider, ThemeConfig } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import '@/styles/globals.less';

import { RootRouter } from './Router';
import stores from './stores';

dayjs.locale('zh-cn');

/**
 * antd 主题配置
 *  token 主题变量可以从 https://ant.design/theme-editor-cn 获取和展示
 */
const theme: ThemeConfig = {
  token: {
    // colorPrimary: '#1677ff',
    // borderRadius: 0,
  },
};

function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Provider {...stores}>
        <ConfigProvider theme={theme} locale={zhCN}>
          <RootRouter />
        </ConfigProvider>
      </Provider>
    </Suspense>
  );
}

export default App;
