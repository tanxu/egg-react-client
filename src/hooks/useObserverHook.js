import React, { useEffect } from 'react';

let observer;
export default function useObserverHook(ele, callback, watch) {
  useEffect(() => {
    const element = document.querySelector(ele);
    observer = new IntersectionObserver(entries => {
      callback && callback(entries);
    });
    observer.observe(element);
    // 离开页面
    return () => {
      if (observer) {
        // 解绑元素
        observer.unobserve(element);
        // 停止监听
        observer.disconnect();
      }
    };
  }, watch);
}
