import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { history } from 'umi';
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';
import './index.less';

function Register(props) {
  const [state, setState] = useState();
  const { getFieldProps, validateFields } = props.form;
  const { user: { registerAsync } } = useStoreHook();

  useEffect(() => {

  }, []);

  const handleSubmit = () => {
    validateFields((err, value) => {
      if (err) {
        Toast.fail('请将信息补充完整');
        return;
      }
      if (value.password !== value.rePassword) {
        Toast.fail('两次密码输入不一致,请重新输入!');
        return;
      }
      // TODO 发送登录请求
      registerAsync({
        username: value.username,
        password: value.password,
      });
    });
  };
  const handleClick = () => {
    history.push({
      pathname: '/login',
    });
  };

  return (
    <div className={'register-page'}>
      <List renderHeader={() => '用户注册'}>
        <InputItem {...getFieldProps('username', { rules: [{ required: true }] })} placeholder={'用户名'}>
          用户名:
        </InputItem>
        <InputItem {...getFieldProps('password', { rules: [{ required: true }] })} placeholder={'密码'}>
          密码:
        </InputItem>
        <InputItem {...getFieldProps('rePassword', { rules: [{ required: true }] })} placeholder={'确认密码'}>
          确认密码:
        </InputItem>
      </List>
      <Button type={'warning'} onClick={handleSubmit}>注册</Button>
      <div className="login" onClick={handleClick}>已有帐户?去登录</div>
    </div>
  );
}

export default createForm()(Register);
