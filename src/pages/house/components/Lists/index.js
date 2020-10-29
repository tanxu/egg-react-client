import React, { useState, useEffect } from 'react';
import { MoreLoading } from '@/components';
import { timer } from '@/utils';

export default function(props) {
  const [state, setState] = useState();

  useEffect(() => {

  }, []);

  return (
    <div className='comment'>
      <h1 className='comment-title'>评论</h1>
      <div className="comment-lists">
        {props?.lists?.map(item => (
          <div className="comment-lists_item" key={item.id}>
            <img src={item.user.avatar} alt="" className="avatar" />
            <div className="right">
              <div className="right-top">
                <p>{item.user.username}</p>
                <p>{timer(item.createTime)}</p>
              </div>
              <div className="right-bottom">
                {item.msg}
              </div>
            </div>
          </div>
        ))}
        <MoreLoading showLoading={props?.showLoading} />
      </div>
    </div>
  );
}
