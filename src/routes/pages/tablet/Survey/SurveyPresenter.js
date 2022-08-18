import { useState } from 'react';
import { Surveycontent } from './components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './survey.css';

const SurveyPresenter = ({ surveyList, setSurveyAnswer, insertAnswer }) => {
  // console.log(surveyList);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(false);

  const { survey_questions } = surveyList;

  const prev = () => {
    if (survey_questions[questionIndex - 1] === undefined) return;
    setQuestionIndex(questionIndex - 1);
  };

  const next = () => {
    if (survey_questions[questionIndex + 1] === undefined) return;
    setQuestionIndex(questionIndex + 1);
  };

  const handeSurveyAnswer = (reply) => {
    const temp = survey_questions.map((item) => {
      if (reply[0].questions_id === item.questions_id) {
        item.survey_replys = reply;
      }
      return item;
    });
    setSurveyAnswer(temp);
  };

  return (
    surveyList.length !== 0 && (
      <>
        <div className="ps-presenter">
          {!result ? (
            <div className="ps-title-box">
              <div className="ps-title-text">
                진료 설문 조사
                <div className="ps-title-step">
                  ({questionIndex + 1}/{survey_questions.length})
                </div>
              </div>
            </div>
          ) : (
            <div className="ps-title-box">
              <div className="ps-title-text">
                설문하신 내용이 올바르게 작성되었습니까?
              </div>
            </div>
          )}

          <div className="ps-content-box">
            <div className="ps-content-flex-box">
              {!result ? (
                <>
                  <Surveycontent
                    currentQuestionIndex={questionIndex}
                    survey={survey_questions[questionIndex]}
                    setSurveyAnswer={handeSurveyAnswer}
                  />
                  <div className="ps-content-step-btn-box">
                    <div className="ps-content-step-btn prev" onClick={prev}>
                      <div className="ps-content-step-btn-icon prev">
                        <ArrowLeftOutlined />
                      </div>
                      <div className="ps-content-step-btn-text prev">이전</div>
                    </div>
                    {questionIndex === survey_questions.length - 1 ? (
                      <div
                        className="ps-content-step-btn next"
                        onClick={() => setResult(true)}
                      >
                        <div className="ps-content-step-btn-text next">
                          완료
                        </div>
                      </div>
                    ) : (
                      <div className="ps-content-step-btn next" onClick={next}>
                        <div className="ps-content-step-btn-text next">
                          이후
                        </div>
                        <div className="ps-content-step-btn-icon next">
                          <ArrowRightOutlined />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div
                  style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                >
                  {survey_questions
                    .sort((a, b) => a.questions_order - b.questions_order)
                    .map((item) => {
                      const {
                        questions_id,
                        questions_nm,
                        questions_order,
                        questions_type,
                        survey_replys,
                      } = item;
                      return (
                        <div key={questions_id} style={{ marginBottom: '1vh' }}>
                          <div
                            className="ps-content-question-area"
                            style={{
                              margin: '2 0',
                              borderBottom: '3px solid lightgray',
                            }}
                          >
                            <div className="reply_questions">
                              {questions_order + 1}. {questions_nm}
                            </div>
                          </div>
                          <div className="reply_answer">
                            {questions_type === 'TEXT' ? (
                              <div
                                key={survey_replys[0].replys_id}
                                className="replys_answer_item"
                              >
                                {survey_replys[0].replys_value}
                              </div>
                            ) : (
                              survey_replys
                                .filter((item) => item.checked)
                                .map((reply, idx) => {
                                  const { replys_id, replys_value } = reply;
                                  return (
                                    <div
                                      key={replys_id}
                                      className="replys_answer_item"
                                    >
                                      {replys_value}
                                    </div>
                                  );
                                })
                            )}
                          </div>
                        </div>
                      );
                    })}
                  <div className="ps-content-step-btn-box">
                    <div
                      className="ps-content-step-btn prev"
                      onClick={() => setResult(false)}
                    >
                      <div className="ps-content-step-btn-icon prev">
                        <ArrowLeftOutlined />
                      </div>
                      <div className="ps-content-step-btn-text prev">이전</div>
                    </div>
                    <div
                      className="ps-content-step-btn next"
                      onClick={insertAnswer}
                    >
                      <div className="ps-content-step-btn-text next">완료</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default SurveyPresenter;
