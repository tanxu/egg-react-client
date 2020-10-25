import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Search from './components/search';
import { ErrorBoundary } from '@/components';
import Hot from './components/hot';
import './index.less';
import { useHttpHook } from '@/hooks';

export default function(props) {
  const [citys, citysLoading] = useHttpHook({
    url: '/commons/citys',
  });
  const [houses, housesLoading] = useHttpHook({
    url: '/house/hot',
  });

  useEffect(() => {

  }, []);

  return (
    <ErrorBoundary>
      <div className='home'>
        {/*header区域*/}
        <Header />
        {/*search区域*/}
        {citys && <Search citys={citys} citysLoading={citysLoading} />}
        {/*hot区域*/}
        {houses && <Hot houses={houses} />}
      </div>
    </ErrorBoundary>
  );
}
