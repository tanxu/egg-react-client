import { cookie } from 'project-libs/';
import { history } from 'umi';

export function onRouteChange(route) {
  const nowPath = route.routes[0].routes.filter(item => item.path === route.location.pathname);

  try {
    const user = JSON.parse(cookie.get('user'));
    console.log('nowP', nowPath.auth)
    if (nowPath.length === 1 && nowPath[0].auth && !user) {
      // 未登录
      history.push({
        pathname: '/login',
        query: {
          from: route.location.pathname,
        },
      });
    }
  } catch (e) {

  }
}
