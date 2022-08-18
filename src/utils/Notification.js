import React from 'react';
import { Button, notification } from 'antd';

/**
 *  noti.openNotification({
      title: '테스트',
      message: '메시지 테스트',
      type: 'warning',
      confirm: {
        title: '컨펌',
        callback: () => {
          //console.log('컨펌 콜백 함수');
        }
      },
      close: () => {
        //console.log('종료');
      }
    });
 * 
 * 
 */

export default class Notification {
  /**
   * Notification 컴포넌트가 닫히기전 실행 훅
   */
  close = (callback) => {
    //callback();
  };

  /**
   * Notification 컴포넌트 오픈 함수
   * @param {type, { title } confirm, title, message, close,} obj
   */
  openNotification = (obj = {}) => {
    const key = `open${Date.now()}`;
    let typeFlag = false;
    let confirmFlag = false;

    // console.log(obj);

    if (obj.hasOwnProperty('confirm') && typeof obj.confirm == 'object') {
      confirmFlag = true;
      if (!obj.confirm.hasOwnProperty('title')) {
        obj.confirm.title = 'confirm';
      }
    } else {
      confirmFlag = false;
    }

    if (!obj.hasOwnProperty('title')) {
      obj.title = '타이틀';
    }

    if (!obj.hasOwnProperty('message')) {
      obj.message = '메시지';
    }

    if (obj.hasOwnProperty('type')) {
      if (
        obj.type !== 'success' &&
        obj.type !== 'info' &&
        obj.type !== 'warning' &&
        obj.type !== 'error'
      ) {
        obj.type = 'success';
      }
      typeFlag = true;
    } else {
      typeFlag = false;
    }

    // console.log(obj);

    let parameter = {
      message: obj.title,
      description: obj.message,
      key,
      onClose: this.close,
    };

    if (obj.hasOwnProperty('close') && typeof obj.close == 'function') {
      parameter.onClose = obj.close;
    }

    const btn = confirmFlag && (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          obj.confirm.callback();
          notification.close(key);
        }}
      >
        {obj.confirm.title}
      </Button>
    );

    if (confirmFlag) {
      parameter.btn = btn;
    }

    if (typeFlag) {
      notification[obj.type](parameter);
    } else {
      notification.open(parameter);
    }
  };
}
