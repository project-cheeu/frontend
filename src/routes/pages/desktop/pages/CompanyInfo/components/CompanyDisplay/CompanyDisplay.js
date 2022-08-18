import { Button, Descriptions, Input } from 'antd';
import moment from 'moment';
import React, { createRef, useState } from 'react';
import './company-info.css';
import QRCode from 'qrcode.react';
import { base_url } from 'utils';

const CompanyDisplay = ({ company, setCompanyInfo, updateCompanyInfo }) => {
  /* Router */
  /* State */
  const {
    company_nm,
    company_num,
    company_regist_num,
    created_at,
    company_mail,
    company_tel,
    company_id,
    company_addr,
    ebook_url,
  } = company;
  const [toggle, setToggle] = useState(false);
  /* Hooks */
  const canvasRef = createRef();
  /* Functions */

  /**
   * QR코드 다운로드
   * --
   */
  const downloadQr = () => {
    const canvas = document.getElementById('created_qrcode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${company_nm}_qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  /**
   * 병원정보 변경 핸들러
   * --
   */
  const handleUpdate = async () => {
    const result = await updateCompanyInfo();
    if (result) {
      setToggle(false);
    }
  };

  /* Render */
  return (
    company && (
      <div className="company-info-container">
        <Descriptions
          title={
            <div className="company_title">
              <div>병원 정보</div>
              {toggle ? (
                <Button onClick={handleUpdate}>완료</Button>
              ) : (
                <Button onClick={() => setToggle(true)}>수정</Button>
              )}
            </div>
          }
          bordered
        >
          <Descriptions.Item label="병원명" span={6}>
            {toggle ? (
              <Input
                value={company_nm}
                name="company_nm"
                onChange={(e) => setCompanyInfo(e.target.name, e.target.value)}
              />
            ) : (
              company_nm
            )}
          </Descriptions.Item>
          <Descriptions.Item label="회사 사업자등록번호" span={4}>
            {company_regist_num}
          </Descriptions.Item>
          <Descriptions.Item label="회사 법인번호" span={4}>
            {company_num}
          </Descriptions.Item>
          <Descriptions.Item label="회사 대표 주소" span={4}>
            {toggle ? (
              <Input
                value={company_addr}
                name="company_addr"
                onChange={(e) => setCompanyInfo(e.target.name, e.target.value)}
              />
            ) : (
              company_addr
            )}
          </Descriptions.Item>

          <Descriptions.Item label="회사 대표 메일" span={2}>
            {toggle ? (
              <Input
                value={company_mail}
                name="company_mail"
                onChange={(e) => setCompanyInfo(e.target.name, e.target.value)}
              />
            ) : (
              company_mail
            )}
          </Descriptions.Item>
          <Descriptions.Item label="회사 대표 전화번호" span={2}>
            {toggle ? (
              <Input
                value={company_tel}
                name="company_tel"
                onChange={(e) => setCompanyInfo(e.target.name, e.target.value)}
              />
            ) : (
              company_tel
            )}
          </Descriptions.Item>
          <Descriptions.Item label="가입일" span={2}>
            {moment(created_at * 1000).format('lll')}
          </Descriptions.Item>
          <Descriptions.Item label="병원 고유 코드" span={2}>
            {company_id}
          </Descriptions.Item>
          <Descriptions.Item label="E-Book" span={6}>
            {toggle ? (
              <Input
                value={ebook_url}
                name="ebook_url"
                onChange={(e) => setCompanyInfo(e.target.name, e.target.value)}
              />
            ) : (
              ebook_url
            )}
          </Descriptions.Item>
          <Descriptions.Item label="QR-Code" span={6}>
            <div
              style={{
                width: '300px',
                // height: '400px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <QRCode
                // style={{ width: '300px', height: '300px' }}"
                value={`${base_url}/${company_id}`}
                ref={canvasRef}
                id="created_qrcode"
                size="256"
              />
              <div style={{ padding: '1vw' }}>
                <Button onClick={downloadQr} style={{ width: '100%' }}>
                  다운로드
                </Button>
              </div>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
    )
  );
};

CompanyDisplay.defaultProps = {
  company: 'CompanyInfo',
  updateCompany: () => {},
};

export default CompanyDisplay;
