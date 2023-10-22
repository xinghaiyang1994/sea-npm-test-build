export type TLoggerFn = (msg: string, ...rest: any[]) => void;
/** 统一日志信息 */
declare const logger: Record<'log' | 'warn' | 'error', TLoggerFn>;
export default logger;
