import React from 'react';
import { Drawer, Button, Input, Select, Descriptions } from 'antd';
const { Option } = Select;

const DeptRegist = ({
  visible,
  setVisible,
  deptInfo,
  setDeptInfo,
  memberList,
  insertDept,
  update,
  updateDept,
}) => {
  const closeDrawer = () => {
    setDeptInfo({});
    setVisible(false);
  };

  const onSubmit = async () => {
    let result;
    if (update) {
      result = await updateDept();
    } else {
      result = await insertDept();
    }

    if (result) {
      setDeptInfo({});
      closeDrawer();
    }
  };

  const onDeptNm = (e) => {
    setDeptInfo({ ...deptInfo, dept_nm: e.target.value });
  };
  const onDeptManager = (e) => {
    // console.log(e);
    setDeptInfo({ ...deptInfo, dept_manager: e });
  };

  return (
    <>
      <Drawer
        title={update ? '부서 수정' : '부서 추가'}
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
          <Descriptions.Item label="부서명" span={3}>
            <Input
              placeholder="부서명을 입력하세요."
              value={deptInfo.dept_nm}
              onChange={onDeptNm}
            />
          </Descriptions.Item>

          <Descriptions.Item label="부서책임자" span={3}>
            <Select
              style={{ width: '100%' }}
              placeholder="부서책임자"
              value={deptInfo.dept_manager}
              onChange={onDeptManager}
            >
              {memberList.map((item) => {
                const { member_nm } = item;
                return <Option value={member_nm}>{member_nm}</Option>;
              })}
            </Select>
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default DeptRegist;
