import React from 'react';
import { Descriptions, Input } from 'antd';

const MemberInfoRegist = ({ memberInfo, setMemberInfo }) => {
  const [check, setCheck] = React.useState(true);

  const checkPassword = (e) => {
    const { member_login_pw } = memberInfo;
    if (e.target.value !== member_login_pw) {
      setCheck(false);
      return;
    }
    setCheck(true);
  };

  return (
    <div className="admin-company-submit">
      <Descriptions bordered>
        <Descriptions.Item label="사원 권한" span={4}>
          <Input name="member_div" disabled value="관리자" />
        </Descriptions.Item>
        <Descriptions.Item label="사원명" span={4}>
          <Input
            name="member_nm"
            value={memberInfo.member_nm}
            onChange={(e) =>
              setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="사원 로그인 아이디" span={4}>
          <Input
            name="member_login_id"
            value={memberInfo.member_login_id}
            onChange={(e) =>
              setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div>
              사원 로그인 비밀번호
              {!check && <div style={{ color: 'red' }}>※ 비밀번호 다름</div>}
            </div>
          }
          span={4}
        >
          <Input
            name="member_login_pw"
            type="password"
            value={memberInfo.member_login_pw}
            onChange={(e) =>
              setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div>
              사원 로그인 비밀번호 확인{' '}
              {!check && <div style={{ color: 'red' }}>※ 비밀번호 다름</div>}
            </div>
          }
          span={4}
        >
          <Input
            style={{ color: !check && 'red' }}
            name="member_login_pw_check"
            type="password"
            value={memberInfo.member_login_pw_check}
            onChange={checkPassword}
          />
        </Descriptions.Item>
        <Descriptions.Item label={<div>사원 핀 비밀번호 </div>} span={4}>
          <Input
            style={{ color: !check && 'red' }}
            name="member_pin"
            type="password"
            value={memberInfo.member_pin}
            onChange={(e) =>
              setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value })
            }
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default MemberInfoRegist;
