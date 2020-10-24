import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile';
import { useStoreHook } from 'think-react-store';
import { createForm } from 'rc-form';

function Edit(props) {
  const { getFieldProps, validateFields } = props.form;
  const { user: { editUserAsync, getUserAsync, avatar, phone, sign } } = useStoreHook();
  const [files, setFiles] = useState([{url: avatar}]);
  useEffect(() => {
    console.log(props);
    getUserAsync({})
  }, []);
  const handleChange = (files) => {
    console.log(files);
    if (files[0]?.file.size / 1024 / 1024 > 0.5) {
      Toast.fail('图片大小不能大于0.5M');
      return;
    }
    setFiles(files);
  };
  const handleSubmit = () => {
    if (!files.length) {
      Toast.fail('请上传图片');
      return;
    }
    validateFields((err, value) => {
      if (err) {
        Toast.fail('请将信息补充完整');
        return;
      }
      // TODO 发送修改
      editUserAsync({
        avatar: files[0].url,
        phone: value.phone,
        sign: value.sign,
      });
    });
  };
  return (
    <div className={'user-edit'}>
      <ImagePicker files={files} selectable={files.length < 1} onChange={handleChange} />
      <InputItem {...getFieldProps('phone', { rules: [{ required: true }], initialValue: phone })}
                 placeholder={'电话'}>
        电话:
      </InputItem>
      <InputItem {...getFieldProps('sign', { rules: [{ required: true }], initialValue: sign })}
                 placeholder={'签名'}>
        签名:
      </InputItem>
      <Button type={'warning'} style={{ marginTop: '20px' }} onClick={handleSubmit}>修改</Button>
    </div>
  );
}

export default createForm()(Edit);
