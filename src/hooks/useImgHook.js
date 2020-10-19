import React, { useEffect } from 'react';
import { isEmpty } from 'project-libs';

/**
 * 1, 监听图片是否进入可视区域
 * 2, 如果图片进入可视区域,将src属性的值替换为真是的图片地址, data-src假的图片地址
 * 3, 如果图片已经替换, 停止对当前dom的监听
 * @param ele
 * @param callback
 * @param watch
 * @returns {JSX.Element}
 */
let observer;
export default function useImgHook(ele, callback, watch = []) {

  useEffect(() => {
    const nodes = document.querySelectorAll(ele);
    if (!isEmpty(nodes)) {
      observer = new IntersectionObserver((entries => {
        callback && callback(entries);
        entries.forEach(item => {
          if (item.isIntersecting) {
            const dataSrc = item.target.getAttribute('data-src');
            item.target.setAttribute('src', dataSrc);
            observer.unobserve(item.target);
          }
        });
      }));
      // 监听dom节点
      nodes.forEach(item => {
        observer.observe(item);
      });
    }
    return () => {
      console.log('out');
      if (!isEmpty(nodes) && observer) {
        observer.disconnect();
      }
    };
  }, watch);


}
