import { Http } from '@/utils';
import { CommonEnum } from '@/enums';

async function handleOrder(url, dispatch, payload) {
  const result = await Http({
    url,
    body: payload,
  });
  dispatch({
    type: 'setOrder',
    payload: result,
  });
}

export default {
  state: {
    detail: {},
    // 评论
    comments: [],
    // 分页数据
    page: CommonEnum.PAGE,
    //
    showLoading: true,

    // 每当 reloadCommentsNum 发生变化,就请求comments接口
    reloadCommentsNum: 0,

    order: null,
  },
  reducers: {
    // 获取民宿详情
    getDetail(state, payload) {
      return {
        ...state,
        detail: payload,
      };
    },
    setOrder(state, payload) {
      return {
        ...state,
        order: payload,
      };
    },
    // 获取评论列表
    getComments(state, payload) {
      return {
        ...state,
        comments: payload,
      };
    },
    // 监听reload变化
    reloadComments(state, payload) {
      return {
        ...state,
        reloadCommentsNum: state.reloadCommentsNum + 1,
        page: {
          ...CommonEnum.PAGE,
          pageNum: state.page.pageNum + 1,
        },
      };
    },
    // 设置showLoading
    setShowLoading(state, payload) {
      return {
        ...state,
        showLoading: payload,
      };
    },
    // 重置评论数据
    resetData(state, payload) {
      return {
        ...state,
        // detail: {},
        comments: [],
        page: CommonEnum.PAGE,
        showLoading: true,
        reloadCommentsNum: 0,
        ...payload,
      };
    },
  },
  effects: {
    async getDetailAsync(dispatch, rootState, payload) {
      const detail = await Http({
        url: '/house/detail',
        body: payload,
      });
      dispatch({
        type: 'getDetail',
        payload: detail,
      });
    },
    async getCommentsAsync(dispatch, rootState, payload) {
      const { comments, page } = rootState.house;
      const lists = await Http({
        url: '/comment/lists',
        body: {
          ...payload,
          pageSize: page.pageSize,
          pageNum: page.pageNum,
        },
      });
      dispatch({
        type: 'getComments',
        // 数据拼装, ...comments代表之前的数据, ...lists代表刚请求回来的数据
        payload: [...comments, ...lists],
      });
      dispatch({
        type: 'setShowLoading',
        payload: !!lists.length,
      });
    },
    async addCommentsAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/comment/add',
        body: payload,
      });
      if (result) {
        dispatch({
          type: 'resetData',
          payload: {},
        });
      }
    },

    async hasOrderAsync(dispatch, rootState, payload) {
      await handleOrder('/orders/hasOrder', dispatch, payload);
    },

    async addOrderAsync(dispatch, rootState, payload) {
      await handleOrder('/orders/addOrder', dispatch, payload);
    },

    async delOrderAsync(dispatch, rootState, payload) {
      await handleOrder('/orders/delOrder', dispatch, payload);
    },
  },
};
