import React, { useState, useEffect } from 'react';
import { Link } from 'umi';

export default function(props) {
  const [state, setState] = useState();

  useEffect(() => {

  }, []);

  return (
    <div className='home-header'>
      <div className='home-header_title'>民宿</div>
      <div className="home-header_login">
        <Link to='/login'>登录</Link> | <Link to='/register'>注册</Link>
      </div>
    </div>
  );
}
