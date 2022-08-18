import React, { useEffect, useState } from 'react';
import { Button, Steps } from 'antd';
import AdminGrid from 'components/layout/AdminGrid';
import './admin_company_submit.css';
import { CompanyInfoRegist, DeptInfoRegist, RegistResult } from './components';
import MemberInfoRegist from './components/MemberInfoRegist';
const { Step } = Steps;

const AdminCompanyRegistPresenter = ({ insertCompany }) => {
  /* Router */
  /* State */

  const [companyInfo, setCompanyInfo] = useState({});
  const [deptInfo, setDeptInfo] = useState({ dept_nm: '경영지원' });
  const [memberInfo, setMemberInfo] = useState({ member_div: 'ADMIN' });
  const [current, setCurrent] = useState(0);

  /* Hooks */
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.id = 'daum-post-code-api';
    document.body.appendChild(script);
    // eslint-disable-next-line
  }, []);

  /* Functions */
  const handleOpenAddr = () => {
    new window.daum.Postcode({
      onComplete: (data) => {
        const { address, buildingName, zonecode } = data;
        setCompanyInfo({
          ...companyInfo,
          company_addr1: `${address} ${buildingName}(${zonecode})`,
        });
      },
    }).open();
  };

  const handleSubmit = async () => {
    const { company_addr1, company_addr2 } = companyInfo;

    await insertCompany({
      companyInfo: {
        ...companyInfo,
        company_addr: `${company_addr1} ${company_addr2}`,
      },
      deptInfo,
      memberInfo,
    });
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: '병원',
      content: (
        <CompanyInfoRegist
          companyInfo={companyInfo}
          setCompanyInfo={setCompanyInfo}
          handleOpenAddr={handleOpenAddr}
        />
      ),
      desc: (
        <div>
          <div>병원정보를 입력합니다.</div>
          <div>
            전화번호, 메일, 사업자등록번호, 법인번호는 고유한 값이어야합니다.
          </div>
        </div>
      ),
    },
    {
      title: '부서',
      content: <DeptInfoRegist deptInfo={deptInfo} setDeptInfo={setDeptInfo} />,
      desc: (
        <div>
          <div>관리부서명을 입력합니다.</div>
          <div>기본값은 경영지원입니다.</div>
        </div>
      ),
    },
    {
      title: '관리자',
      content: (
        <MemberInfoRegist
          memberInfo={memberInfo}
          setMemberInfo={setMemberInfo}
        />
      ),
      desc: (
        <div>
          <div>관리 사원을 입력합니다.</div>
          <div>병원의 관리자 사용자입니다.</div>
        </div>
      ),
    },
    {
      title: '등록',
      content: (
        <RegistResult
          companyInfo={companyInfo}
          deptInfo={deptInfo}
          memberInfo={memberInfo}
        />
      ),
      desc: <div>아래의 정보를 한번 더 확인해주세요.</div>,
    },
  ];

  /* Render */
  return (
    <AdminGrid>
      <Steps current={current} style={{ padding: '1%' }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ padding: '1%' }}>
        {steps[current].desc}
      </div>
      <div className="steps-content">{steps[current].content}</div>

      <div style={{ marginTop: '1%', textAlign: 'center' }}>
        {current > 0 && (
          <Button style={{ marginRight: '10px' }} size="large" onClick={prev}>
            이전
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" size="large" onClick={handleSubmit}>
            완료
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" size="large" onClick={next}>
            다음
          </Button>
        )}
      </div>
    </AdminGrid>
  );
};

export default AdminCompanyRegistPresenter;
