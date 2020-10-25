import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { List, Button } from 'antd-mobile';
import { useStoreHook } from 'think-react-store';
import { ErrorBoundary } from '@/components';
import './index.less';

export default function(props) {
  const [state, setState] = useState();
  const { user: { username, phone, sign, avatar, getUserAsync, logoutAsync } } = useStoreHook();
  useEffect(() => {
    getUserAsync({
      id: 10,
    });
  }, []);
  const handleClick = () => {
    history.push({
      pathname: '/user/edit',
      query: {
        id: 10,
      },
    });
  };
  const handleLogOut = () => {
    logoutAsync();
  };
  return (
    <ErrorBoundary>
      <div className={'user-page'}>
        {/*用户信息*/}
        <div className={'info'}>
          <div className="set" onClick={handleClick}>设置</div>
          <div className="user">
            <img src={avatar || require('../../assets/yay.jpg')} alt="" />
            <div className="tel">{phone}</div>
            <div className="sign">{sign}</div>
          </div>
        </div>
        {/*列表*/}
        <div className="lists">
          <List>
            <List.Item arrow={'horizontal'}>用户协议</List.Item>
            <List.Item arrow={'horizontal'}>常见问题</List.Item>
            <List.Item arrow={'horizontal'}>联系客服</List.Item>
          </List>
        </div>
        <Button type={'warning'} style={{ marginTop: '100px' }} onClick={handleLogOut}>退出登录</Button>
      </div>
    </ErrorBoundary>
  );
}
