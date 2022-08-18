import { Button, Descriptions, Drawer, Input, Select, Switch } from 'antd';
import { useAppState } from 'context/MainContext';
import React from 'react';
import { MessageAlert, TypeManager } from 'utils';

const { Option } = Select;

const MemberRegist = ({
  visible,
  setVisible,
  memberInfo,
  setMemberInfo,
  update,
  deptList,
  setMemberDept,
  updateMember,
  insertMember,
}) => {
  const { member } = useAppState();
  const { member_div } = member;
  /**
   * @title 드로워 초기화
   */
  const closeDrawer = () => {
    setVisible(false);
    setMemberInfo({});
  };

  /**
   * @title 멤버 정보 핸들러
   * @param {Object} e 인풋 핸들러
   */
  const handleSetMemberInfo = (e) => {
    setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value });
  };

  /**
   * @title 멤버 정보 등록 / 변경 핸들러
   */
  const onSubmit = async () => {
    let result;
    const { member_nm, member_login_id, member_login_pw } = memberInfo;
    if (
      member_nm.length === 0 ||
      member_login_id.length < 4 ||
      member_login_pw.length < 4
    ) {
      MessageAlert.warning('입력하지 않은 항목이 있습니다.');
      return;
    }
    if (update) {
      result = await updateMember();
    } else {
      result = await insertMember();
    }

    if (result) {
      setMemberInfo({});
      closeDrawer();
    }
  };

  const handleSetMemberDept = async (a, val) => {
    const { key, value } = val;
    if (update) {
      const { member_id } = memberInfo;
      const memberDept = {
        member_id,
        dept_id: key,
      };
      const result = await setMemberDept(memberDept);
      if (!result) {
        return;
      }
    }
    setMemberInfo({ ...memberInfo, dept_nm: value, dept_id: key });
  };

  const setMemberDiv = (e) => {
    setMemberInfo({ ...memberInfo, member_div: e });
  };

  return (
    <>
      <Drawer
        title={update ? '직원 수정' : '직원 추가'}
        width={720}
        onClose={closeDrawer}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              취소
            </Button>
            <Button type="primary" onClick={onSubmit}>
              확인
            </Button>
          </div>
        }
      >
        <Descriptions layout="vertical">
          <Descriptions.Item label="직원명" span={3}>
            <Input
              name="member_nm"
              required
              placeholder="직원명을 입력하세요."
              value={memberInfo.member_nm}
              onChange={handleSetMemberInfo}
            />
          </Descriptions.Item>
          <Descriptions.Item label="직원 로그인 아이디" span={3}>
            <Input
              required
              name="member_login_id"
              disabled={update}
              placeholder="직원명을 입력하세요."
              value={memberInfo.member_login_id}
              onChange={handleSetMemberInfo}
            />
          </Descriptions.Item>
          <Descriptions.Item label="직원 로그인 비밀번호" span={3}>
            <Input.Password
              required
              name="member_login_pw"
              placeholder="비밀번호를 입력하세요."
              value={memberInfo.member_login_pw}
              onChange={handleSetMemberInfo}
            />
          </Descriptions.Item>
          <Descriptions.Item label="직원 핀번호" span={3}>
            <Input.Password
              required
              name="member_pin"
              placeholder="핀번호를 입력하세요."
              value={memberInfo.member_pin}
              onChange={handleSetMemberInfo}
            />
          </Descriptions.Item>
          <Descriptions.Item label="직원 부서" span={3}>
            <Select
              style={{ width: '100%' }}
              value={memberInfo.dept_nm}
              disabled={member_div !== 'ADMIN'}
              onChange={handleSetMemberDept}
            >
              {deptList.map((item) => {
                const { dept_id, dept_nm } = item;
                return (
                  <Option key={dept_id} value={dept_nm}>
                    {dept_nm}
                  </Option>
                );
              })}
            </Select>
          </Descriptions.Item>
          <Descriptions.Item label="직원 구분" span={3}>
            <Select
              style={{ width: '100%' }}
              value={memberInfo.member_div}
              disabled={member_div !== 'ADMIN'}
              onChange={setMemberDiv}
            >
              {TypeManager.memberDivList().map((item) => {
                const { type, value } = item;
                return (
                  <Option key={type} value={type}>
                    {value}
                  </Option>
                );
              })}
            </Select>
          </Descriptions.Item>
          {update && (
            <Descriptions.Item label="직원 사용여부" span={3}>
              <Switch
                checked={memberInfo.use_yn}
                disabled={member_div !== 'ADMIN'}
              />
            </Descriptions.Item>
          )}
        </Descriptions>
      </Drawer>
    </>
  );
};

export default MemberRegist;
