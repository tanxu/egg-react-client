import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook, useObserverHook } from '@/hooks';

import { useLocation } from 'umi';
import './index.less';

export default function(props) {
  // 获取url参数
  const { query } = useLocation();
  console.log(query);
  // 分页状态
  const [page, setPage] = useState({
    // 每页展示的条数
    pageSize: 8,
    // 当前页码
    pageNum: 1,
  });
  const [houseSubmitName, setHouseSubmitName] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [houseLists, setHouseLists] = useState([]);
  // 搜索栏状态
  const [houseName, setHouseName] = useState('');
  // 请求搜索数据
  const [houses, housesLoading] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseName: houseName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59',
    },
    //3, 监听分页数据的修改,发送请求下一页的数据
    watch: [page.pageNum],
  });
  useEffect(() => {
    // 4, 监听loading的变化,拼装数据
    if (!housesLoading && houses) {
      if (houses.length) {
        setHouseLists([...houseLists, ...houses]);
        if (houses.length !== page.pageSize) {
          setShowLoading(false);
        }
      } else {
        setShowLoading(false);
      }
    }
  }, [housesLoading, houseSubmitName]);

  /*
  * 1, 监听loading是否展示出来
  * 2, 修改分页数据
  * 3, 监听分页数据的修改,发送请求下一页的数据
  * 4, 监听loading的变化,拼装数据
  * */
  // 1, 监听loading是否展示出来
  useObserverHook('#loading', (entries) => {
    console.log('entries', entries);
    if (!housesLoading && entries[0].isIntersecting) {
      // 2, 修改分页数据
      setPage({
        ...page,
        pageNum: page.pageNum + 1,
      });
    }
  }, null);

  const handleChange = (value) => {
    setHouseName(value);
  };
  const handleCancle = () => {
    _handleSubmit('');
  };
  const handleSubmit = (value) => {
    console.log(value);
    _handleSubmit(value);
  };
  const _handleSubmit = (value) => {
    setHouseName(value);
    setHouseSubmitName(value);
    setPage({
      ...page,
      pageNum: 1,
    });
    setHouseLists([]);
  };

  return (
    <div className='search-page'>
      {/*顶部搜索栏*/}
      <SearchBar placeholder='搜索民宿' value={houseName} onChange={handleChange} onCancel={handleCancle}
                 onSubmit={handleSubmit}></SearchBar>
      {/*搜索结果*/}
      {
        !houseLists.length ?
          <ActivityIndicator toast /> :
          <div className="result">
            {houseLists.map(item => (
              <div className="item" key={item.id}>
                <img src={item.img} alt="" className="img" />
                <div className="item-right">
                  <div className="title">{item.title}</div>
                  <div className="price">{item.price}</div>
                </div>
              </div>
            ))}
            {showLoading ? <div id='loading'>loading</div> : <div>没有数据啦</div>}
          </div>
      }
    </div>
  );
}
