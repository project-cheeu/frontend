import React from 'react';
import './dial.css';
const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, '✕', 0, '⬅'];

const Dial = ({ numList, dialAction, footer, header }) => {
  return (
    <div className="phone-dial">
      {header}
      <div className="dial-wrapper">
        {numList.map((item, idx) => {
          return (
            <div
              key={idx}
              className={item === '' ? 'blank' : 'dial'}
              onClick={() => dialAction(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
      {/* <div
        style={{
          width: '25vw',
          lineHeight: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '6vw',
            fontSize: '1.2vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 1vw',
          }}
        >
          모두 지우기
        </div>
        <div
          style={{
            width: '6vw',
            fontSize: '1.2vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 1vw',
          }}
        ></div>
        <div
          style={{
            width: '6vw',
            fontSize: '1.2vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 1vw',
          }}
        >
          하나 지우기
        </div>
      </div> */}

      {footer}
    </div>
  );
};

Dial.defaultProps = {
  numList: NUMBER_LIST,
  dialAction: () => {},
};

export default Dial;
