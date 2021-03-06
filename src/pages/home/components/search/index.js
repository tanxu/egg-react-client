import React, { useState, useEffect, memo } from 'react';
import { Picker, List, Calendar, Button } from 'antd-mobile';
import dayjs from 'dayjs';
import { history } from 'umi';
import { Toast } from 'antd-mobile';

function Search(props) {
  // const [citys, setCitys] = useState([
  //   [{ label: '杭州', value: '10001' }, { label: '苏州', value: '10002' }],
  // ]);

  console.log('search render');
  const [selectedCity, setSelectedCity] = useState(['10001']);
  const [times, setTimes] = useState('可选时间');
  const [dateShow, setDateShow] = useState(false);

  useEffect(() => {

  }, []);

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };
  const handleDate = () => {
    setDateShow(!dateShow);
  };
  const handleDateConfim = (startTime, endTime) => {
    setTimes(dayjs(startTime).format('YYYY-MM-DD') + '~' + dayjs(endTime).format('YYYY-MM-DD'));
    handleDate();
  };
  const handleClick = () => {
    if (!times.includes('~')) {
      Toast.fail('请选择时间');
      return;
    }
    history.push({
      pathname: '/search',
      query: {
        code: selectedCity,
        startTime: times.split('~')[0],
        endTime: times.split('~')[1],
      },
    });
  };

  return (
    <div className='search'>
      {/*可选城市*/}
      <div className="search-addr">
        {
          !props.citysLoading &&
          <Picker title='城市' data={props.citys} value={selectedCity} cascade={false} cols={1}
                  onChange={handleCityChange}>
            <List.Item>可选城市</List.Item>
          </Picker>
        }

      </div>
      {/*可选时间*/}
      <div className="search-time" onClick={handleDate}>
        <p className='search-time_left'>出租时间</p>
        <p className="search-time_right">{times}</p>
      </div>
      {/*点击按钮*/}
      <Button type='warning' size='large' onClick={handleClick}>搜索民宿</Button>

      <Calendar visible={dateShow} onCancel={handleDate} onConfirm={handleDateConfim}></Calendar>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  // console.log('prev', prevProps);
  // console.log('next', nextProps);
  if (prevProps.citys === nextProps.citys && prevProps.citysLoading === nextProps.citysLoading) {
    return true;
  } else {
    return false;
  }
}

export default memo(Search, areEqual);
