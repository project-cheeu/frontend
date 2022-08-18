import { Button, Card, Descriptions } from 'antd';
import React, { useState } from 'react';
import { rrn } from 'utils';
import './phoneconfirm.css';

const PhoneConfirm = ({
  handleCancel,
  submitAction,
  signupAction,
  userInfo,
}) => {
  /* State */
  const { chief, userList, dumps } = userInfo;
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Hooks */

  /* Functions */
  /**
   * 환자 선택
   * @param {*} item
   */
  const handleSelectCustomer = (item) => {
    if (toggle === item) {
      setToggle(false);
      return;
    }
    setToggle(item);
  };

  const handleLoading = async (data) => {
    setLoading(true);
    await submitAction(data);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return chief ? (
    <div className="phoneconfirm-container">
      {toggle ? (
        <div>{toggle.customer_nm} 님이 맞으신가요?</div>
      ) : (
        <div>{userInfo.chief.customer_tel} 번호의 고객정보 확인</div>
      )}

      {userList.lengt !== 1 &&
        (toggle ? (
          <div style={{ fontSize: '2vw' }}>아래 접수하기를 눌러주세요</div>
        ) : userList.length === 1 ? (
          <div style={{ fontSize: '2vw' }}>
            {chief.customer_nm}님이 맞으신가요?
          </div>
        ) : (
          <div style={{ fontSize: '2vw' }}>
            접수하시는 분의 이름을 선택해주세요.
          </div>
        ))}
      {userList.length === 1 ? (
        <>
          <Descriptions bordered className="userinfo-container">
            <Descriptions.Item label="고객명" span={3} className="userinfo">
              {chief.customer_nm}
            </Descriptions.Item>
            <Descriptions.Item label="생년월일" span={3} className="userinfo">
              {rrn(chief.customer_num)}
            </Descriptions.Item>
            <Descriptions.Item label="전화번호" span={3} className="userinfo">
              {chief.customer_tel}
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        userList.map((item) => {
          const { customer_id, customer_nm, customer_num } = item;
          return (
            <>
              <Card
                bodyStyle={{ width: '100%', fontSize: '2.5vw' }}
                style={{
                  width: '80%',
                  backgroundColor:
                    customer_id === toggle.customer_id && '#1890ff',
                  color: customer_id === toggle.customer_id && 'white',
                }}
                span={3}
                className="userinfo multi"
                onClick={() => handleSelectCustomer(item)}
              >
                {customer_nm} ({rrn(customer_num)})
              </Card>
            </>
          );
        })
      )}
      {toggle ? (
        <div className="btn-container">
          <Button
            type="default"
            className="phoneconfirm-btn"
            style={{ color: 'red' }}
            loading={loading}
            onClick={() => handleLoading(toggle)}
          >
            접수하기
          </Button>
        </div>
      ) : (
        <div className="btn-container">
          <Button
            type="default"
            className="phoneconfirm-btn"
            onClick={handleCancel}
          >
            나가기
          </Button>
          <Button
            type="default"
            className="phoneconfirm-btn"
            onClick={() => signupAction(true)}
          >
            이 번호로 <br />
            추가 등록하기
          </Button>
          {userList.length === 1 && (
            <Button
              type="primary"
              className="phoneconfirm-btn"
              onClick={() => handleLoading(chief)}
              loading={loading}
            >
              네, 맞습니다
            </Button>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="phoneconfirm-container">
      {dumps && dumps.length > 0 ? (
        <>
          <div>오래된 고객 정보가 있습니다.</div>
          <div>접수하시겠습니까?</div>
          <Card
            bodyStyle={{ width: '100%', fontSize: '2.5vw' }}
            style={{ width: '80%' }}
            span={3}
            className="userinfo"
          >
            {dumps[0].customer_nm} ({rrn(dumps[0].customer_num)}){' '}
            {dumps.length >= 2 && `외 ${dumps.length - 1}명`}
          </Card>
          {/* {dumps.map((item) => {
            const { customer_nm, customer_num } = item;
            return (
              <Card
                bodyStyle={{ width: '100%', fontSize: '2.5vw' }}
                style={{ width: '80%' }}
                span={3}
                className="userinfo"
              >
                {customer_nm} ({rrn(customer_num)})
              </Card>
            );
          })} */}
        </>
      ) : (
        <>
          <div>고객 정보가 없습니다.</div>
          <div>접수하시겠습니까?</div>
        </>
      )}

      <div className="btn-container">
        <Button
          type="default"
          className="phoneconfirm-btn"
          onClick={handleCancel}
        >
          아닙니다.
        </Button>
        <Button
          type="primary"
          className="phoneconfirm-btn"
          onClick={() => signupAction(dumps.length === 0 ? false : dumps)}
        >
          네, 알겠습니다.
        </Button>
      </div>
    </div>
  );
};

export default PhoneConfirm;
