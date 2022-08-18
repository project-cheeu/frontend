import { URSurveyApi } from 'api';
import { useAppState } from 'context/MainContext';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MessageAlert } from 'utils';
import PresurveyPresenter from './PresurveyPresenter';

const PresurveyContainer = () => {
  const [surveyList, setSurveyList] = useState([]);
  const [surveyAnswer, setSurveyAnswer] = useState({});
  const { company, customer } = useAppState();
  const { company_id } = company;

  const history = useHistory();

  useEffect(() => {
    getPresurveyList();
    // eslint-disable-next-line
  }, []);

  const handleSurveyAnswer = (val) => {
    setSurveyAnswer({ ...surveyAnswer, survey_questions: val });
  };

  const getPresurveyList = async () => {
    const result = await URSurveyApi.getSurveyList(company_id);
    if (result) {
      const survey = result.filter((item) => {
        const { survey_type, survey_questions } = item;
        survey_questions.sort((a, b) => {
          return a.questions_order - b.questions_order;
        });
        return survey_type === 'PRE_SURVEY';
      });
      const [pre_survey] = survey;
      setSurveyList(pre_survey);
      setSurveyAnswer({ ...pre_survey, ...customer });
    }
  };

  const handleInsertAnswer = async () => {
    const { medical_id, survey_questions } = surveyAnswer;
    const surveyAnswerInfo = {
      medical_id,
      customer_answer: survey_questions,
      survey_type: 'PRE_SURVEY',
    };

    const result = await URSurveyApi.insertSurveyAnswer(surveyAnswerInfo);
    if (result) {
      MessageAlert.success('문진표 등록이 완료되었습니다.');
      history.replace('/t/done', { survey: true });
      return;
    }
    MessageAlert.error('문진표 등록에 실패했습니다.');
  };

  return (
    <PresurveyPresenter
      surveyList={surveyList}
      surveyAnswer={surveyAnswer}
      setSurveyAnswer={handleSurveyAnswer}
      insertAnswer={handleInsertAnswer}
    />
  );
};

export default PresurveyContainer;
