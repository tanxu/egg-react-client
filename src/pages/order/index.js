import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import './index.less';
import Lists from './components/Lists';
import { useHttpHook } from '@/hooks';
import { CommonEnum } from '@/enums';

export default function(props) {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [orders] = useHttpHook({
    url: '/order/lists',
    body: { ...page },
  });
  const tabs = [
    { title: '未支付', sub: 0 },
    { title: '已支付', sub: 1 },
  ];
  useEffect(() => {

  }, []);

  return (
    <div className='order-page'>
      <Tabs tabs={tabs}>
        <div className="tab">
          <Lists orders={orders} type={0} />
        </div>
        <div className="tab">
          <Lists orders={orders} type={1} />
        </div>
      </Tabs>
    </div>
  );
}
