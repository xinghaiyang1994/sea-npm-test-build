import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { RouterProvider, Navigate, useRouteError } from 'react-router-dom';

import RouterErrorBoundary from '@/components/RouterErrorBoundary';
import HomeLayout from '@/components/HomeLayout';
// import Login from '@/pages/Login';
// import PageOne from '@/pages/PageOne';
// import PageTwo from '@/pages/PageTwo';
const TestTransparentVideo = lazy(() => import('@/pages/TestTransparentVideo'));
const PageTwo = lazy(() => import('@/pages/PageTwo'));

/** 无虑掉无效路由(handle.show 为 false 的为无效路由) */
const filterInvalidRoutes = (routes: RouteObject[]) =>
  routes.filter((el) => {
    if (el?.children) {
      el.children = filterInvalidRoutes(el.children);
    }
    // 未定义 show 则默认为展示;定义 show 则按 show 值来判断
    return typeof el.handle?.show === 'undefined' || (typeof el.handle?.show !== 'undefined' && Boolean(el.handle?.show));
  });

/**
 * 创建路由树
 *    说明:
 *      - 入参可根据用户信息调整
 *      - handle.show 来控制路由显隐.不设置默认为展示
 */
const createRoutes = (): RouteObject[] => {
  const routes: RouteObject[] = [
    // / 页面可以根据用户是否登录调整 Navigate 的 to
    {
      index: true,
      element: <Navigate to={'/home'} />,
    },
    // 登录后的页面
    {
      path: '/home',
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="test-transparent-video" />,
        },
        {
          path: 'test-transparent-video',
          element: <TestTransparentVideo />,
        },
        {
          path: 'bar',
          element: <PageTwo />,
        },
      ],
    },
    // 兜底页默认为 /
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ];
  return [
    {
      errorElement: <RouterErrorBoundary />,
      children: filterInvalidRoutes(routes),
    },
  ];
};

/** 根路由(也可以放在 App.ts 中) */
export function RootRouter() {
  /**
   * 路由
   * 这里可以包含一些全局请求(如用户信息)的逻辑
   */
  const router = createBrowserRouter(createRoutes());

  return <RouterProvider router={router} />;
}
