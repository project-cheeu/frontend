import { Checkbox, Input, Radio } from 'antd';
import { LayerKeyboard } from 'components';
import { useState } from 'react';

const Presurveycontent = ({
  currentQuestionIndex,
  survey,
  setSurveyAnswer,
}) => {
  const { questions_nm, survey_replys } = survey;
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleSetSurveyAnswer = (reply, idx, text) => {
    const { questions_type, questions_id } = survey;
    if (questions_type === 'MULTI') {
      const temp = survey_replys.map((item) => {
        if (reply.replys_id === item.replys_id) {
          if (item.checked) {
            item.checked = false;
          } else {
            item.checked = true;
          }
          if (item.replys_rate === 9999) {
            // console.log(item.replys_value);
            item.replys_value = text ? text : '';
          }
        }
        return item;
      });
      setSurveyAnswer(temp);
    } else if (questions_type === 'SINGLE') {
      const temp = survey_replys.map((item) => {
        // console.log(text);
        if (reply.replys_id === item.replys_id) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        if (item.replys_rate === 9999) {
          // console.log(item.replys_value);
          item.replys_value = text ? text : '';
        }
        return item;
      });

      setSurveyAnswer(temp);
    } else {
      setSurveyAnswer([
        {
          questions_id: questions_id,
          replys_value: reply,
        },
      ]);
    }
  };

  const replysItem = survey_replys
    .sort((a, b) => a.replys_order - b.replys_order)
    .map((item, idx) => {
      const { replys_id, replys_value, replys_rate } = item;

      return (
        <Radio
          value={item}
          key={replys_id}
          className="radio-btn"
          onClick={() => {
            replys_rate === 9999 && setKeyboardOpen(true);
            handleSetSurveyAnswer(item, idx, false);
          }}
        >
          {replys_rate === 9999 ? (
            <>
              <Input
                placeholder="기타 단답식 답변"
                value={item.replys_value}
                readOnly
                // onChange={(e) =>
                //   handleSetSurveyAnswer(item, idx, e.target.value)
                // }
              />
              <LayerKeyboard
                result={item.replys_value}
                enterAction={(val) => {
                  setKeyboardOpen(false);
                  handleSetSurveyAnswer(item, idx, val);
                }}
                keyboardOpen={keyboardOpen}
                setKeyboardOpen={setKeyboardOpen}
                setResult={() => {}}
              />
            </>
          ) : (
            replys_value
          )}
        </Radio>
      );
    });

  const multiItem = survey_replys
    .sort((a, b) => a.replys_order - b.replys_order)
    .map((item, idx) => {
      const { replys_id, replys_value, replys_rate } = item;

      return (
        <Checkbox
          value={item}
          key={replys_id}
          className="checkbox-btn"
          onClick={() => {
            replys_rate === 9999 && setKeyboardOpen(true);
            handleSetSurveyAnswer(item, idx);
          }}
        >
          {replys_rate === 9999 ? (
            <>
              <Input
                placeholder="기타 단답식 답변"
                value={item.replys_value}
                style={{
                  width: '50%',
                }}
                readOnly
                onClick={() => setKeyboardOpen(true)}
                // onChange={(e) =>
                //   handleSetSurveyAnswer(item, idx, e.target.value)
                // }
              />
              <LayerKeyboard
                result={item.replys_value}
                enterAction={(val) => {
                  setKeyboardOpen(false);
                  handleSetSurveyAnswer(item, idx, val);
                }}
                keyboardOpen={keyboardOpen}
                setKeyboardOpen={setKeyboardOpen}
                setResult={() => {}}
              />
            </>
          ) : (
            replys_value
          )}
        </Checkbox>
      );
    });

  return (
    survey.length !== 0 && (
      <>
        <div className="ps-content-question-area">
          {currentQuestionIndex + 1}. {questions_nm}
        </div>
        <div className="ps-content-radio-btn-area">
          {survey.questions_type === 'TEXT' ? (
            <input onChange={(e) => handleSetSurveyAnswer(e.target.value)} />
          ) : survey.questions_type === 'MULTI' ? (
            <Checkbox.Group>{multiItem}</Checkbox.Group>
          ) : (
            <Radio.Group>{replysItem}</Radio.Group>
          )}
        </div>
      </>
    )
  );
};

export default Presurveycontent;
