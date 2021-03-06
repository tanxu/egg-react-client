import { Http } from '@/utils';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { cookie, urlGet } from 'project-libs';

export default {
  state: {
    id: undefined,
    username: undefined,
    avatar: undefined,
    phone: undefined,
    sign: undefined,
  },
  reducers: {
    getUser(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    editUser(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    async getUserAsync(dispatch, rootState, payload) {
      const user = await Http({
        url: '/user/detail',
        body: payload,
      });
      if (user) {
        dispatch({
          type: 'getUser',
          payload: user,
        });
      }
    },
    async editUserAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/user/edit',
        body: payload,
      });
      if (result) {
        Toast.success('修改成功');
        history.push({
          pathname: '/user',
        });
      }
    },
    async loginAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/user/login',
        body: payload,
      });
      if (result) {
        const from = urlGet('from');
        // cookie.set('user', JSON.stringify(result));
        localStorage.setItem('token', result.token);
        history.push({
          pathname: from || '/user',
        });
        Toast.success('登录成功');
      }
    },
    async registerAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/user/register',
        body: payload,
      });
      if (result) {
        // cookie.set('user', JSON.stringify(result));
        localStorage.setItem('token', result.token);
        Toast.success('注册成功');
        history.push({
          pathname: '/login',
        });
      }
    },

    async logoutAsync(dispatch, rootState, payload) {
      await Http({
        url: '/user/logout',
        body: payload,
      });
      Toast.success('退出成功');
      localStorage.clear();
      window.location.href = '/login?from=' + window.location.pathname;
    },
  },
};
