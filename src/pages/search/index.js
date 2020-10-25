import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { MoreLoading } from '@/components';
import { useLocation } from 'umi';
import { CommonEnum } from '@/enums';
import './index.less';

export default function(props) {
  // 获取url参数
  const { query } = useLocation();
  // 分页状态
  const [page, setPage] = useState(CommonEnum.PAGE);
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
    watch: [page.pageNum, houseSubmitName],
  });
  useEffect(() => {
    // 4, 监听loading的变化,拼装数据
    if (!housesLoading && houses) {
      if (houses.length) {
        setHouseLists([...houseLists, ...houses]);
        if (houses.length < page.pageSize) {
          setShowLoading(false);
        }
      } else {
        setShowLoading(false);
      }
    }
  }, [housesLoading]);

  useImgHook('.item-img', (entries) => {
  }, null);

  /*
  * 1, 监听loading是否展示出来
  * 2, 修改分页数据
  * 3, 监听分页数据的修改,发送请求下一页的数据
  * 4, 监听loading的变化,拼装数据
  * */
  // 1, 监听loading是否展示出来
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    // console.log('entries', entries);
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
    // console.log(value);
    _handleSubmit(value);
  };
  const _handleSubmit = (value) => {
    setHouseName(value);
    setHouseSubmitName(value);
    setPage(CommonEnum.PAGE);
    setHouseLists([]);
  };

  return (
    <div className='search-page'>
      {/*顶部搜索栏*/}
      <SearchBar placeholder='搜索民宿' value={houseName} onChange={handleChange} onCancel={handleCancle}
  onSubmit={handleSubmit}/>
      {/*搜索结果*/}
      {
        !houseLists.length ?
          <ActivityIndicator toast /> :
          <div className="result">
            {houseLists.map(item => (
              <div className="item" key={item.id}>
                <img data-src={item?.imgs[0]?.url} src={require('../../assets/blank.png')} alt="" className="item-img" />
                <div className="item-right">
                  <div className="title">{item.name}</div>
                  <div className="price">{item.price}</div>
                </div>
              </div>
            ))}
            <MoreLoading showLoading={showLoading} />
          </div>
      }
    </div>
  );
}
