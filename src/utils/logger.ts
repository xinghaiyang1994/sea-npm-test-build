import { LOG_PREFIX } from '../constants';

const createPrefix = (msg: string) => `${LOG_PREFIX} ${msg}`;

export type TLoggerFn = (msg: string, ...rest: any[]) => void;

/** 统一日志信息 */
const logger: Record<'log' | 'warn' | 'error', TLoggerFn> = {
  log: (msg: string, ...rest: any[]) => {
    console.log(createPrefix(msg), ...rest);
  },
  warn: (msg: string, ...rest: any[]) => {
    console.warn(createPrefix(msg), ...rest);
  },
  error: (msg: string, ...rest: any[]) => {
    console.error(createPrefix(msg), ...rest);
  },
};

export default logger;
