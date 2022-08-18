/*eslint-disable*/
import React, { useState } from 'react';
import AdminGrid from 'components/layout/AdminGrid';

import { Button, Tabs, Spin, Alert } from 'antd';

// 자식 컴포넌트 추가
import { SurveyQuestions } from './components';

// 스타일시트 적용
// import './survey-update.css';
import { URSurveyApi } from 'api';

const { TabPane } = Tabs;

const SurveyInfoPresenter = ({ surveyData, refresh }) => {
  if (surveyData.length === 0)
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin tip="Loading..." />
      </div>
    );

  const [nowActivePanel, setNowActivePanel] = useState(surveyData[0].survey_id);

  // 탭 내용 정의
  const tabContent = surveyData.map((data) => {
    return (
      <TabPane
        key={data.survey_id}
        tab={
          <span>
            {data.survey_type == 'PRE_SURVEY' ? '초기 문진' : '만족도 조사'}
          </span>
        }
        style={{ overflowY: 'auto' }}
      >
        <SurveyQuestions survey={data} refresh={refresh} />
      </TabPane>
    );
  });

  // 활성화 탭 처리
  const handleChangeTab = (activeKey) => {
    setNowActivePanel(activeKey);
  };

  //신규 질문 추가
  const handleAddQuestion = () => {
    const surveyIdx = surveyData.findIndex(
      (s) => s.survey_id === nowActivePanel
    );
    const questionLength = surveyData[surveyIdx].survey_questions.length;
    const newQuestion = {
      survey_id: nowActivePanel,
      questions_nm: '새로운 질문',
      questions_type: 'SINGLE',
      questions_order: questionLength,
      questions_rate: 0,
      questions_qty: 0,
    };

    URSurveyApi.insertQuestion(newQuestion).then(() => {
      const lastQuestionElement = document.querySelector(
        '#questionsScrollBox>div:last-child'
      );
      refresh(() => {
        if (lastQuestionElement) {
          lastQuestionElement.scrollIntoView(true);
        }
      });
    });
  };

  return (
    <AdminGrid>
      <div className="survey-update-container">
        <Tabs
          defaultActiveKey={0}
          tabBarExtraContent={
            <Button type="primary" onClick={() => handleAddQuestion()}>
              질문 추가
            </Button>
          }
          onChange={(activeKey) => {
            handleChangeTab(activeKey);
          }}
        >
          {tabContent}
        </Tabs>
      </div>
    </AdminGrid>
  );
};

export default SurveyInfoPresenter;
