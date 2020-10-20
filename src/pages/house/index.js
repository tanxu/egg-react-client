import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Info from './components/Info';
import Lists from './components/Lists';
import Footer from './components/Footer';
import { useStoreHook } from 'think-react-store';
import { useObserverHook } from '@/hooks';
import { useLocation } from 'umi';
import './index.less';
import { CommonEnum } from '@/enums';

export default function(props) {
  const { house: { detail, comments, getDetailAsync, getCommentsAsync, reloadComments, reloadCommentsNum, showLoading, resetData } } = useStoreHook();

  /**
   * 1, 监听loading是否展示出来
   * 2, 触发reload,修改分页
   * 3, 监听reload变化,重新请求接口
   * 4, 拼装数据
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, entries => {
    // 如果loading组件进入可视区域
    if (comments && comments.length && showLoading && entries[0].isIntersecting) {
      reloadComments();
    }
  }, [comments]);

  const { query } = useLocation();

  useEffect(() => {
    // 获取民宿详情逻辑
    getDetailAsync({
      id: query.id,
    });
  }, []);

  useEffect(() => {
    // 获取评论列表逻辑
    getCommentsAsync({
      id: query.id,
    });
  }, [reloadCommentsNum]);

  useEffect(() => {
    return () => {
      resetData({ detail: {} });
    };
  }, []);

  return (
    <div className='house-page'>
      {/*banner*/}
      <Banner banner={detail?.banner} />
      {/*  房屋信息*/}
      <Info info={detail?.info} />
      {/*评论列表*/}
      <Lists lists={comments} showLoading={showLoading} />
      {/*  footer*/}
      <Footer />
    </div>
  );
}
