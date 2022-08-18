import React from 'react';
import { Descriptions, Input } from 'antd';

const CompanyInfoRegist = ({ companyInfo, setCompanyInfo, handleOpenAddr }) => {
  return (
    <div className="admin-company-submit">
      <Descriptions bordered>
        <Descriptions.Item label="병원명" span={4}>
          <Input
            name="company_nm"
            value={companyInfo.customer_nm}
            onChange={(e) =>
              setCompanyInfo({
                ...companyInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="병원 대표 전화번호" span={4}>
          <Input
            name="company_tel"
            value={companyInfo.company_tel}
            onChange={(e) =>
              setCompanyInfo({
                ...companyInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="병원 대표 주소" span={4}>
          <Input
            onClick={handleOpenAddr}
            onFocus={handleOpenAddr}
            disabled={companyInfo.company_addr1}
            name="company_addr1"
            value={companyInfo.company_addr1}
          />
        </Descriptions.Item>
        <Descriptions.Item label="병원 상세주소" span={4}>
          <Input
            disabled={!companyInfo.company_addr1}
            name="company_addr2"
            value={companyInfo.company_addr2}
            onChange={(e) =>
              setCompanyInfo({
                ...companyInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="병원 대표 메일" span={4}>
          <Input
            name="company_mail"
            value={companyInfo.company_mail}
            onChange={(e) =>
              setCompanyInfo({
                ...companyInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="병원 사업자등록번호" span={4}>
          <Input
            name="company_regist_num"
            value={companyInfo.company_regist_num}
            onChange={(e) =>
              setCompanyInfo({
                ...companyInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="병원 법인번호" span={4}>
          <Input
            name="company_num"
            value={companyInfo.company_num}
            onChange={(e) =>
              setCompanyInfo({
                ...companyInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="병원 E-Book" span={4}>
          <Input
            name="ebook_url"
            value={companyInfo.ebook_url}
            onChange={(e) =>
              setCompanyInfo({
                ...companyInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default CompanyInfoRegist;
