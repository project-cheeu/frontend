import React from 'react';
import { Descriptions, Input } from 'antd';

const DeptInfoRegist = ({ deptInfo, setDeptInfo }) => {
  return (
    <div className="admin-company-submit">
      <Descriptions bordered>
        <Descriptions.Item label="부서명" span={4}>
          <Input
            name="dept_nm"
            value={deptInfo.dept_nm}
            onChange={(e) =>
              setDeptInfo({ ...deptInfo, [e.target.name]: e.target.value })
            }
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default DeptInfoRegist;
