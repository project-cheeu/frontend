/*eslint-disable*/
import React, { useRef, useState } from 'react';
import { Button, Card, Checkbox, Input, Popconfirm, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

const { Option } = Select;

const SurveyQuestion = ({
  idx,
  questionData,
  cardActiveState,
  onClickQuestion,
  onRemoveQuestion,
  onUpdateQuestion,
  onAddAnswer,
  onRemoveAnswer,
  onUpdateAnswer,
  onUpdateQuestionChoiceType,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const { questions_id, questions_nm, survey_replys } = questionData;

  survey_replys.sort((a, b) => {
    return a.replys_order - b.replys_order;
  });
  // 비활성화 상태 답변 리스트 요소 객체
  // [질문: 비활성화] [답변 : 비활성화]
  const passiveReplyList = survey_replys.map((answer, idx) => ({
    key: `${answer.replys_value}${idx}`,
    label: answer.replys_value,
    value: idx,
  }));

  // 비활성화 상태 답변 리스트 박스 템플릿
  const passiveReplyCardTemplate = (
    <Checkbox.Group options={passiveReplyList} disabled={true}></Checkbox.Group>
  );

  // 활성화된 카드의 답변 리스트 요소 템플릿
  const activeReplyCardTemplate = survey_replys.map((answer, idx) => {
    const { replys_value, replys_id } = answer;

    // 답변 리스트의 단일 답변 요소의 템플릿
    const activeCardReplyTemplate =
      activeAnswer === replys_id ? (
        // 1. 현재 포커싱된 답변의 템플릿
        <Input
          defaultValue={replys_value}
          size="small"
          onPressEnter={(e) => {
            onUpdateAnswer(questions_id, replys_id, e.target.value);
            setActiveAnswer(null);
          }}
        />
      ) : (
        // 2. 비활성화 상태 답변 템플릿
        <div
          onClick={(e) => {
            e.preventDefault();
            e.nativeEvent.preventDefault();
            setActiveAnswer(replys_id);
          }}
          onMouseEnter={(e) => {
            e.stopPropagation();

            e.nativeEvent.stopImmediatePropagation();
          }}
        >
          <span className="active-question-passive-reply">{replys_value}</span>
        </div>
      );

    return (
      <div className="checkbox-item">
        <Checkbox
          key={`${replys_value}${idx}`}
          value={replys_id}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {activeCardReplyTemplate}
        </Checkbox>
      </div>
    );
  });

  // 활성화된 상태 답변 리스트 박스 템플릿
  const activeReplyElementTemplate = (
    <Checkbox.Group
      defaultValue={null}
      onChange={(e) => {
        setSelectedAnswers(e);
      }}
      style={{
        display: 'flex',
      }}
    >
      {activeReplyCardTemplate}
    </Checkbox.Group>
  );

  /**
   * @title getItemStyle
   * @description drag & drop 각 요소에 적용되는 아이템
   * @param isDragging 드래그 여부
   * @param draggableStyle 드래그 가능 스타일
   */
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    // userSelect: 'none',
    // opacity: '0.5',
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  // 카드의 현재 활성화 상태에 맞는 템플릿
  const cardTemplate = cardActiveState ? (
    // 1. 활성화 상태의 카드 템플릿
    <div className="survey-question-item survey-list-sort-list">
      <div className="question-box">
        <Card
          title={
            <Input
              defaultValue={questions_nm}
              bordered={false}
              style={{
                backgroundColor: '#f0f0f0',
                width: '80%',
              }}
              onChange={(e) => {
                onUpdateQuestion(questionData, e.target.value);
              }}
            />
          }
          extra={
            <>
              <Button
                danger
                onClick={() => {
                  onRemoveAnswer(questions_id, selectedAnswers, () => {
                    setSelectedAnswers([]);
                  });
                }}
                style={{
                  visibility:
                    selectedAnswers.length === 0 ? 'hidden' : 'visible',
                }}
              >
                선택지 제거
              </Button>

              <Button
                className="question-add-button"
                style={{
                  marginLeft: '10px',
                }}
                onClick={() => {
                  onAddAnswer(questionData);
                }}
              >
                선택지 추가
              </Button>

              <Select
                defaultValue={questionData.questions_type}
                style={{
                  marginLeft: '10px',
                }}
                onChange={(value) => {
                  onUpdateQuestionChoiceType(questionData, value);
                }}
              >
                <Option value="SINGLE">단일 선택</Option>
                <Option value="MULTI">복수 선택</Option>
              </Select>

              <div id="areaDivider">&nbsp;</div>
              <Popconfirm
                className="remove-button"
                title={'Are you sure?'}
                okText="Yes"
                cancelText="No"
                onConfirm={(e) => {
                  onRemoveQuestion(questionData);
                }}
              >
                <CloseOutlined
                  style={
                    {
                      // marginLeft: '20px',
                    }
                  }
                />
              </Popconfirm>
            </>
          }
        >
          <div className="question-answer-box">
            {activeReplyElementTemplate}
          </div>
        </Card>
      </div>
    </div>
  ) : (
    // 2. 비활성화 상태의 카드 템플릿
    <div
      className="survey-question-item survey-list-sort-list"
      onClick={() => {
        onClickQuestion(questions_id);
      }}
    >
      <div className="question-box">
        <Card title={questions_nm}>
          <div className="question-answer-box">{passiveReplyCardTemplate}</div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="box" key={questions_id}>
      <Draggable key={questions_id} draggableId={`${questions_id}`} index={idx}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {cardTemplate}
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default SurveyQuestion;
