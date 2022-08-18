/*eslint-disable*/
import React, { useState } from 'react';
import SurveyQuestion from './SurveyQuestion';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { URSurveyApi } from 'api';
import { Empty } from 'antd';

const Survey = ({ survey, refresh }) => {
  const { survey_id, survey_questions } = survey;

  const [activatedQuestion, setActivatedQuestion] = useState(
    survey_questions.length
      ? survey_questions[survey_questions.length - 1].questions_id
      : null
  );

  // 포커스 질문 처리
  const onClickQuestion = (q_id) => {
    setActivatedQuestion(q_id);
  };

  // 질문 삭제 처리
  const onRemoveQuestion = (question) => {
    const { questions_id } = question;

    URSurveyApi.removeQuestion({ questions_id, survey_id }).then(() => {
      refresh();
    });
  };

  let updateQuestionNameDebounceHanlder = null;

  // 질문 텍스트 수정 처리
  const onUpdateQuestion = (question, newText) => {
    if (updateQuestionNameDebounceHanlder != null) {
      clearTimeout(updateQuestionNameDebounceHanlder);
    }
    updateQuestionNameDebounceHanlder = setTimeout(() => {
      updateQuestionDebounceController(question, newText);
    }, 500);
  };

  //질문 텍스트 수정 처리 함수
  const updateQuestionDebounceController = (question, newText) => {
    const newQuestion = { ...question, questions_nm: newText };

    URSurveyApi.updateQuestion(newQuestion).then(() => {
      refresh();
    });
  };

  // 질문 답변 선택지 수정 처리 함수
  const onUpdateQuestionChoiceType = (question, newType) => {
    const newQuestion = { ...question, questions_type: newType };

    URSurveyApi.updateQuestion(newQuestion).then(() => {
      refresh();
    });
  };

  // 댓글 추가 처리
  const onAddReply = (questionData) => {
    const { questions_id, survey_replys } = questionData;
    const newReply = {
      questions_id: questions_id,
      replys_value: '새로운 선택지',
      replys_rate: 0,
      replys_order: survey_replys.length,
    };

    URSurveyApi.insertReply(newReply).then(() => {
      refresh();
    });
  };

  // 댓글 삭제 처리
  const onRemoveAnswer = (q_id, removedAnswerList, callback) => {
    removedAnswerList.forEach((replys_id) => {
      URSurveyApi.removeReply({ replys_id }).then(() => {
        refresh();
      });
    });

    callback();
  };

  // 댓글 업데이트 처리
  const onUpdateAnswer = (q_id, a_id, newText, rate = 0, order = 0) => {
    const updateReply = {
      questions_id: q_id,
      replys_id: a_id,
      replys_value: newText,
      replys_rate: rate,
      replys_order: order,
    };

    URSurveyApi.updateReply(updateReply).then(() => {
      refresh();
    });
  };

  // drag & drop 결과가 적용됐을 때 실행되는 함수
  const onDragEnd = (result) => {
    if (
      !result.destination ||
      result.source.index === result.destination.index
    ) {
      return;
    }

    // 배열 재정렬 구문
    let new_survey_questions = reorder(
      survey_questions,
      result.source.index,
      result.destination.index
    );

    const fn = (question, index) => {
      question.questions_order = index;
      return new Promise((resolve, reject) => {
        URSurveyApi.updateQuestion(question).then(() => {
          resolve();
        });
      });
    };
    let actions = new_survey_questions.map(fn);

    Promise.all(actions).then(() => {
      refresh();
    });
  };

  // drag & drop 액션으로 반영된 결과를 context에 적용
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * @title getListStyle
   * @description drag & drop이 수행되는 박스 영억의 디자인
   * @param isDraggingOver drag 여부
   */
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'inherit' : 'inherit',
  });

  // 질문 컨텐츠
  const questionContent = survey_questions
    .sort((a, b) => {
      return a.questions_order - b.questions_order;
    })
    .map((question, idx) => {
      return (
        <SurveyQuestion
          id={`question_${idx}`}
          idx={idx}
          questionData={question}
          cardActiveState={question.questions_id === activatedQuestion}
          onClickQuestion={onClickQuestion}
          onRemoveQuestion={onRemoveQuestion}
          onUpdateQuestion={onUpdateQuestion}
          onAddAnswer={onAddReply}
          onRemoveAnswer={onRemoveAnswer}
          onUpdateAnswer={onUpdateAnswer}
          onUpdateQuestionChoiceType={onUpdateQuestionChoiceType}
        />
      );
    });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <div className="survey-item">
              {questionContent.length === 0 ? (
                <div className="empty">
                  <Empty />
                </div>
              ) : (
                <div id="questionsScrollBox">{questionContent}</div>
              )}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Survey;
