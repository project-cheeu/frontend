import React, { useState } from 'react';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Typography,
  Row,
  Col,
  Button,
  Dropdown,
  Menu,
  Collapse,
  Image,
  Space,
} from 'antd';
import './profile.css';
import { bucket_url, rrn, TypeManager } from 'utils';
import { URAgreementApi, URSurveyApi } from 'api';
import { useAppState } from 'context/MainContext';
import moment from 'moment';
import { useHistory } from 'react-router';
import { isMobile } from 'react-device-detect';

const { Title } = Typography;
const { Panel } = Collapse;

const CustomerProfile = ({
  customer,
  medical_status,
  medicalActions,
  startSurvey,
  startPresurvey,
  medical_id,
}) => {
  const history = useHistory();
  const {
    customer_id,
    customer_nm,
    customer_addr,
    customer_tel,
    customer_num,
    medical_count,
    wating_avg,
    wating_sum,
  } = customer;

  const { company } = useAppState();
  const { company_id } = company;
  const [toggle, setToggle] = useState(false);
  const [agreementToggle, setAgreementToggle] = useState(false);
  const [surveyAnswer, setSurveyAnswer] = useState(undefined);
  const [agreementList, setAgreementList] = useState(undefined);
  const [masking, setMasking] = useState(true);

  React.useEffect(() => {
    setToggle(false);
    setAgreementToggle(false);
  }, [customer_id]);

  const handleSetToggle = async () => {
    const result = await URSurveyApi.getSurveyAnswerList({
      customer_id,
      company_id,
    });
    if (result) {
      const answers = result.sort((a, b) => b.created_at - a.created_at);
      setSurveyAnswer(answers);
      setToggle(true);
    }
  };

  const handleSetAgreementToggle = async () => {
    const result = await URAgreementApi.getUserAgreement({
      customer_id,
      company_id,
    });
    if (result) {
      const answers = result.sort((a, b) => b.created_at - a.created_at);
      setAgreementList(answers);
      setAgreementToggle(true);
    }
  };

  const getAge = (customer_num) => {
    const year = parseInt(customer_num.substring(0, 2));
    const birth = year > 0 ? 1900 + year : 2000 + year;
    return new Date().getFullYear() - birth;
  };

  const menu = (
    <Menu>
      {TypeManager.list().map((item) => {
        const { color, type, value, borderColor, textDecoration } = item;
        return (
          <Menu.Item key={type}>
            <Button
              block
              size="large"
              style={{
                border: `1px solid ${borderColor}`,
                color: color,
              }}
              onClick={() => medicalActions(type)}
            >
              <span style={{ textDecoration: textDecoration }}>{value}</span>
            </Button>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const handleMasking = () => {
    setMasking(!masking);
  };

  return (
    customer && (
      <div className="profile-container">
        <div style={{ display: 'flex' }}>
          <div className="profile-img">
            <Avatar size={256} icon={<UserOutlined />} />
            <Title level={3}>{customer_nm}</Title>
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              arrow
              trigger={['click']}
            >
              <Button
                size="large"
                style={{
                  border: `1px solid ${
                    TypeManager.getStatusType(medical_status).borderColor
                  }`,
                  color: TypeManager.getStatusType(medical_status).color,
                  textDecorationLine:
                    TypeManager.getStatusType(medical_status).textDecoration,
                }}
              >
                <span
                  style={{
                    textDecoration:
                      TypeManager.getStatusType(medical_status).textDecoration,
                  }}
                >
                  {TypeManager.getStatusType(medical_status).value}
                </span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="profile-info">
            <Row gutter={[48, 32]}>
              <Col className="info-label" span={6}>
                ??????
              </Col>
              <Col className="info-value" span={18}>
                {customer_nm}
              </Col>
              <Col className="info-label" span={6}>
                ????????????
              </Col>
              <Col className="info-value" span={18}>
                <Space>
                  {masking ? rrn(customer_num) : customer_num}
                  <Button onClick={handleMasking}>
                    {masking ? '????????? ??????' : '?????????'}
                  </Button>
                </Space>
              </Col>
              <Col className="info-label" span={6}>
                ?????????
              </Col>
              <Col className="info-value" span={18}>
                {customer_tel}
              </Col>
              <Col className="info-label" span={6}>
                ??????
              </Col>
              <Col className="info-value" span={18}>
                {customer_addr}
              </Col>
              <Col className="info-label" span={6}>
                ??????
              </Col>
              <Col className="info-value" span={18}>
                {customer_num && getAge(customer_num)}???
              </Col>
              <Col className="info-label" span={6}>
                ??????
              </Col>
              <Col className="info-value" span={18}>
                {customer_num &&
                parseInt(customer_num.substring(7, 8)) % 2 === 1
                  ? '???'
                  : '???'}
              </Col>
              <Col className="info-label" span={6}>
                ?????? ??????
              </Col>
              <Col className="info-value" span={18}>
                {medical_count}???
              </Col>
              <Col className="info-label" span={6}>
                ???(??????) ????????????
              </Col>
              <Col className="info-value" span={18}>
                {parseInt(wating_sum / 60)}???({parseInt(wating_avg / 60)}???)
                {/* {moment(wating_avg * 1000)} */}
              </Col>
              {startPresurvey && (
                <Col className="info-value" span={6}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      size="large"
                      type="primary"
                      onClick={startPresurvey}
                    >
                      ????????? ??????
                    </Button>
                  </div>
                </Col>
              )}
              {startSurvey && (
                <Col className="info-value" span={6}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button size="large" danger onClick={startSurvey}>
                      ????????? ??????
                    </Button>
                  </div>
                </Col>
              )}
              {isMobile && (
                <Col className="info-value" span={6}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      size="large"
                      type="default"
                      onClick={() =>
                        history.push(`/t/agreement/${customer_id}`)
                      }
                    >
                      ????????? ??????
                    </Button>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </div>
        {toggle ? (
          <>
            <Button
              size="large"
              block
              style={{ width: '80%' }}
              type="dashed"
              onClick={() => setToggle(false)}
            >
              ???????????? ?????? <UpOutlined />
            </Button>
            {surveyAnswer && (
              <Collapse style={{ width: '80%' }}>
                {surveyAnswer.map((item) => {
                  const {
                    created_at,
                    answer_id,
                    customer_answer,
                    survey_type,
                  } = item;
                  return (
                    <Panel
                      header={
                        <div>
                          {moment.unix(created_at).format('ll')}(
                          {TypeManager.getSurveyType(survey_type).value})
                        </div>
                      }
                      key={answer_id}
                    >
                      {customer_answer
                        .sort((a, b) => a.questions_order - b.questions_order)
                        .map((answer) => {
                          const {
                            questions_nm,
                            questions_order,
                            survey_replys,
                          } = answer;
                          return (
                            <div>
                              <div style={{ fontSize: '1.5vw' }}>
                                {questions_order + 1}. {questions_nm}
                              </div>
                              {survey_replys.map((replys) => {
                                const { checked, replys_value } = replys;

                                return (
                                  <div
                                    style={{
                                      color: checked && '#1890ff',
                                    }}
                                  >
                                    - {replys_value}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                    </Panel>
                  );
                })}
              </Collapse>
            )}
          </>
        ) : (
          <Button
            size="large"
            block
            style={{ width: '80%' }}
            type="dashed"
            onClick={handleSetToggle}
          >
            ???????????? ?????? <DownOutlined />
          </Button>
        )}

        {agreementToggle ? (
          <>
            <Button
              size="large"
              block
              style={{ width: '80%' }}
              type="dashed"
              onClick={() => setAgreementToggle(false)}
            >
              ???????????? ?????? <UpOutlined />
            </Button>
            {agreementList && (
              <Collapse style={{ width: '80%' }}>
                {agreementList.map((item) => {
                  const {
                    agreement_id,
                    img_url,
                    created_at,
                    form_nm,
                    form_content,
                  } = item;
                  return (
                    <Panel
                      header={
                        <div>
                          {moment.unix(created_at).format('ll')}({form_nm})
                        </div>
                      }
                      key={agreement_id}
                    >
                      <Image src={`${bucket_url}/${form_content}`} />
                      <Image src={`${img_url}`} />
                    </Panel>
                  );
                })}
              </Collapse>
            )}
          </>
        ) : (
          <Button
            size="large"
            block
            style={{ width: '80%' }}
            type="dashed"
            onClick={handleSetAgreementToggle}
          >
            ???????????? ?????? <DownOutlined />
          </Button>
        )}
      </div>
    )
  );
};

CustomerProfile.defaultProps = {
  medicalActions: () => {},
  medical_status: 'APPLICATION',
};

export default CustomerProfile;
