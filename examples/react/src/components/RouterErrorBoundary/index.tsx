import React, { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

import sentry from '@/plugins/sentry';

import ErrorUI from './components/ErrorUI';

/** 基于 react-router-dom v6 的错误边界处理 */
const RouterErrorBoundary: React.FC = () => {
  const error = useRouteError();

  useEffect(() => {
    const newError = error as Error;
    if (error) {
      sentry.captureException?.(newError, {
        errorType: 'pageBlank',
        errorInfo: newError?.message,
      });
    }
  }, [error]);

  return <ErrorUI />;
};

export default RouterErrorBoundary;
