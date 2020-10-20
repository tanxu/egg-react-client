import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { timer } from '@/utils';

export default function(props) {
  const [state, setState] = useState();

  useEffect(() => {

  }, []);

  return (
    <div className='info'>
      <div className="info-title">{props?.info?.title}</div>
      <div className="info-msg">简介: {props?.info?.msg}</div>
      <div className="info-price">价格:{props?.info?.price}</div>
      <div className="info-time">发布时间:{timer(props?.info?.publishTime)}</div>
      <div className="info-time">开始出租:{timer(props?.info?.startTime, '')}</div>
      <div className="info-time">结束出租:{timer(props?.info?.endTime, '')}</div>
      <Button className='info-btn' type='warning'>预定</Button>
    </div>
  );
}
