import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

import user from './user';

const store = {
  user,
  // 其他全局的 mobx 在下面增加
};

export default store;

export function useStore<T extends keyof typeof store>(name: T) {
  return useContext<Record<string, (typeof store)[typeof name]>>(MobXProviderContext)[name];
}
