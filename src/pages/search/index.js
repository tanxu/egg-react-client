import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook } from '@/hooks';
import './index.less';

export default function(props) {
  const [houseName, setHouseName] = useState('');
  const [houses, housesLoading] = useHttpHook({
    url: '/house/search',
    body: {},
  });
  useEffect(() => {

  }, []);

  const handleChange = (value) => {
    setHouseName(value);
  };
  const handleCancle = () => {

  };
  const handleSubmit = (value) => {

  };

  return (
    <div className='search-page'>
      {/*顶部搜索栏*/}
      <SearchBar placeholder='搜索民宿' value={houseName} onChange={handleChange} onCancel={handleCancle}
                 onSubmit={handleSubmit}></SearchBar>
      {/*搜索结果*/}
      {
        housesLoading ?
          <ActivityIndicator toast/> :
          <div className="result">
            {houses.map(item => (
              <div className="item" key={item.id}>
                <img src={item.img} alt="" className="img" />
                <div className="item-right">
                  <div className="title">{item.title}</div>
                  <div className="price">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}
