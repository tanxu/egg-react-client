import React, { useState, useEffect } from 'react';
import { Modal } from '@/components';
import { TextareaItem, Button } from 'antd-mobile';

export default function(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {

  }, []);
  const handleClick = () => {
    setShow(true);
  };
  const handleChange = (val) => {
    console.log(val);
  };
  const handleClose = () => {
    setShow(false);
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
          <Button className='comment-btn' type={'warning'}>评论</Button>
        </div>
      </Modal>
    </div>
  );
}
