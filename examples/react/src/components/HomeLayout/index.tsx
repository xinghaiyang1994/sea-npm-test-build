import React from 'react';
import { Outlet, Link } from 'react-router-dom';

/** home 路由下的布局组件 */
const HomeLayout: React.FC = () => {
  /** 测试菜单 */
  const renderTestNav = () => (
    <div>
      <div>公共的HomeLayout</div>
      <ul>
        <li>
          <Link to="/login">/login</Link>
        </li>
        <li>
          <Link to="/home/foo">/home/foo</Link>
        </li>
        <li>
          <Link to="/home/bar">/home/bar</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <div>
      {renderTestNav()}
      {/* 子路由占位 */}
      <Outlet />
    </div>
  );
};

export default HomeLayout;
