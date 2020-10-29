import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { timer } from '@/utils';

export default function(props) {
  const [state, setState] = useState();

  useEffect(() => {

  }, []);

  const handleOrder = (id) => {
    props?.btnClick(id);
  };

  const renderBtn = () => {
    // 1, order里面没有id,说明订单一定不存在
    if (!props.order?.id) {
      return <Button className={'info-btn'} type={'warning'} onClick={() => handleOrder()}>预定</Button>;
    }
    // 2, 已经有订单了,处于未支付状态
    if (props.order?.isPayed === 0) {
      return <Button className={'info-btn'} type={'ghost'} onClick={() => handleOrder(props.order.id)}>取消预定</Button>;
    }
    // 3, 已经有订单了,处于已支付状态
    if (props.order?.isPayed === 1) {
      return <Button className={'info-btn'} type={'ghost'}>取消预定</Button>;
    }
  };

  return (
    <div className='info'>
      <div className="info-title">{props?.info?.name}</div>
      <div className="info-msg">简介: {props?.info?.info}</div>
      <div className="info-price">价格:{props?.info?.price}</div>
      <div className="info-time">发布时间:{timer(props?.info?.publishTime)}</div>
      <div className="info-time">开始出租:{timer(props?.info?.startTime, '')}</div>
      <div className="info-time">结束出租:{timer(props?.info?.endTime, '')}</div>
      {renderBtn()}

    </div>
  );
}
