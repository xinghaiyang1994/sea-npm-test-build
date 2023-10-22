import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.less';

const ErrorUI: React.FC = () => {
  const navigate = useNavigate();

  // 回退
  const handlePrevious = () => navigate(-1);

  // 刷新
  const handleReload = () => navigate(0);

  return (
    <div className={styles['error_boundary']}>
      <div className={styles['eb_tip']}>页面出现未知错误，请稍后再试</div>
      <div className={styles['eb_btn_wrap']}>
        <button onClick={handlePrevious} className={styles['eb_btn']}>
          返回上一页
        </button>
        <button onClick={handleReload} className={styles['eb_btn']}>
          刷新重试
        </button>
      </div>
    </div>
  );
};

export default ErrorUI;
