import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import './index.less';

export default function(props) {
  const [state, setState] = useState();

  useEffect(() => {

  }, []);

  return (
    <div className='home'>
      {/*header区域*/}
      <Header />
      {/*search区域*/}
      <Search />
      {/*hot区域*/}
      <Hot />
    </div>
  );
}
