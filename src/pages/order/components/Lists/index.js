import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { isEmpty } from 'project-libs';
import OrderItem from '../Item';

export default function(props) {
  const [state, setState] = useState();

  useEffect(() => {

  }, []);

  return (
    <div>
      {
        isEmpty(props?.orders) ?
          <ActivityIndicator toast /> :
          <div className="tab-lists">
            {props.orders.map(item => (
              <OrderItem type={props.type} key={item.id} {...item} />
            ))}
          </div>
      }
    </div>
  );
}
