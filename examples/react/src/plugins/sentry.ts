import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const isOpenSentry = !process.env.IS_LOCAL;

const release = process.env.GIT_HASH;
const environment = process.env.PROJECT_ENV;

/** 初始化 */
const init = () =>
  Sentry.init({
    // TODO 配置
    dsn: '',
    integrations: [new Integrations.BrowserTracing()],
    release,
    environment,
    tracesSampleRate: 1.0,
  });

/** 主动捕获错误 */
const captureException = (err: Error, extra: Record<string, any>) => {
  Sentry.captureException(err, {
    extra,
  });
};

/** 设置用户信息 */
const setUser = (userId: string) => {
  Sentry.setUser({
    userId,
  });
};

const sentryInfo = {
  init,
  captureException,
  setUser,
};

type TSentryInfo = Partial<typeof sentryInfo>;

console.log('==>isOpenSentry', isOpenSentry, release, environment);
const sentry = isOpenSentry ? sentryInfo : ({} as TSentryInfo);

export default sentry;
