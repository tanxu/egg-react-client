import React, { useState, useEffect } from 'react';
import { Modal } from '@/components';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import { useStoreHook } from 'think-react-store';
import {useLocation} from 'umi'

export default function(props) {
  const [show, setShow] = useState(false);
  const [commentVal, setCommentVal] = useState();
  const { house: { addCommentsAsync } } = useStoreHook();
  const {query} = useLocation()
  useEffect(() => {

  }, []);
  const handleClick = () => {
    setShow(true);
  };
  const handleChange = (val) => {
    setCommentVal(val);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = () => {
    // 提交数据, 成功后请求评论数据
    if (commentVal) {
      addCommentsAsync({
        comment: commentVal,
        houseId: query?.id
      });
      setShow(false);
      setCommentVal('');
    } else {
      Toast.fail('请输入评论内容!');
    }
  };
  return (
    <div>
      <div className='footer' onClick={handleClick}>
        评论~
      </div>
      <Modal show={show} onClose={handleClose} styleBody={{
        height: '220px',
        bottom: '0px',
        top: 'unset',
      }}>
        <div className="modal-comment">
          <TextareaItem rows={2} count={200} onChange={handleChange} />
          <Button className='comment-btn' type={'warning'} onClick={handleSubmit}>评论</Button>
        </div>
      </Modal>
    </div>
  );
}
