import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { history } from 'umi';
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';
import './index.less';

function Login(props) {
  const [state, setState] = useState();
  const { getFieldProps, validateFields } = props.form;
  const { user: { loginAsync } } = useStoreHook();

  useEffect(() => {

  }, []);

  const handleSubmit = () => {
    validateFields((err, value) => {
      if (err) {
        Toast.fail('请将信息补充完整');
        return;
      }
      // TODO 发送登录请求
      loginAsync({
        username: value.username,
        password: value.password,
      });
    });
  };
  const handleClick = () => {
    history.push({
      pathname: '/register',
    });
  };

  return (
    <div className={'login-page'}>
      <List renderHeader={() => '用户登录'}>
          <InputItem {...getFieldProps('username', { rules: [{ required: true }] })} placeholder={'用户名'}>
            用户名:
          </InputItem>
          <InputItem {...getFieldProps('password', { rules: [{ required: true }] })} placeholder={'密码'}>
            密码:
          </InputItem>
      </List>
      <Button type={'warning'} onClick={handleSubmit}>登录</Button>
      <div className="register" onClick={handleClick}>没有帐户?去注册</div>
    </div>
  );
}

export default createForm()(Login);
