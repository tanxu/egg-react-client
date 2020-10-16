import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Search from './components/search';
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
    <div className='home'>
      {/*header区域*/}
      <Header />
      {/*search区域*/}
      <Search citys={citys} citysLoading={citysLoading} />
      {/*hot区域*/}
      <Hot houses={houses}/>
    </div>
  );
}