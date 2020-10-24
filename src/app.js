import { cookie } from 'project-libs/';
import { history } from 'umi';

export function onRouteChange(route) {
  const nowPath = route.routes[0].routes.filter(item => item.path === route.location.pathname);
  // const user = JSON.parse(cookie.get('user'));
  const isLogin = localStorage.getItem('token');
  if (nowPath.length === 1 && nowPath[0].auth && !isLogin) {
    // 未登录
    history.push({
      pathname: '/login',
      query: {
        from: route.location.pathname,
      },
    });
  }

}
