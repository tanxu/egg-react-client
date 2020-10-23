import React, { useState, useEffect } from 'react';
import { cookie } from 'project-libs';
import { Link } from 'umi';

export default function(props) {
  const [state, setState] = useState();

  useEffect(() => {
    console.log('ddd', cookie.get('user'))
  }, []);

  return (
    <div className='home-header'>
      <div className='home-header_title'>民宿</div>
      <div className="home-header_login">
        {JSON.parse(cookie.get('user')) ? JSON.parse(cookie.get('user')).username :
          <Link to='/login'>登录</Link> | <Link to='/register'>注册</Link>}
      </div>
    </div>
  );
}
