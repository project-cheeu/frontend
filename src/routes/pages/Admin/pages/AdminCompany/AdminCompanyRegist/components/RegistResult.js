import React from 'react';
import { Descriptions, Divider } from 'antd';

const RegistResult = ({ companyInfo, deptInfo, memberInfo }) => {
  return (
    <div className="admin-company-submit">
      <Descriptions bordered title="병원정보">
        <Descriptions.Item label="병원명" span={4}>
          {companyInfo.company_nm}
        </Descriptions.Item>
        <Descriptions.Item label="병원 대표 전화번호" span={4}>
          {companyInfo.company_tel}
        </Descriptions.Item>
        <Descriptions.Item label="병원 대표 주소" span={4}>
          {`${companyInfo.company_addr1} ${companyInfo.company_addr2}`}
        </Descriptions.Item>
        <Descriptions.Item label="병원 대표 메일" span={4}>
          {companyInfo.company_mail}
        </Descriptions.Item>
        <Descriptions.Item label="병원 사업자등록번호" span={4}>
          {companyInfo.company_regist_num}
        </Descriptions.Item>
        <Descriptions.Item label="병원 법인번호" span={4}>
          {companyInfo.company_num}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions bordered title="부서정보">
        <Descriptions.Item label="부서명" span={4}>
          {deptInfo.dept_nm}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions bordered title="사원정보">
        <Descriptions.Item label="사원명" span={4}>
          {memberInfo.member_nm}
        </Descriptions.Item>
        <Descriptions.Item label="사원 로그인 아이디" span={4}>
          {memberInfo.member_login_id}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default RegistResult;
