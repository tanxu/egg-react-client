import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { isEmpty } from 'project-libs';
import OrderItem from '../Item';
import { MoreLoading } from '@/components';
import { OrderSkeletons } from '@/skeletons';

export default function(props) {
  const [state, setState] = useState(false);

  useEffect(() => {
    setTimeout(()=>{
      if(isEmpty(props?.orders)){
        setState(true)
      }
    },1500)
  }, []);

  return (
    <div>
      {
        isEmpty(props?.orders) ?
          <>{state?<MoreLoading showLoading={false}/>:<OrderSkeletons />}</> :
          <div className="tab-lists">
            {props.orders.map(item => (
              <OrderItem type={props.type} key={item.id} {...item} />
            ))}
            <MoreLoading showLoading={props.showLoading} />
          </div>
      }

    </div>
  );
}
