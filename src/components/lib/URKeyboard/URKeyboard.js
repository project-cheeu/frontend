import React, { Component } from 'react';
import Keyboard from 'react-simple-keyboard';
import Hangul from 'hangul-js';
import 'react-simple-keyboard/build/css/index.css';
import './keyboard.css';

class URKeyboard extends Component {
  componentDidMount() {
    // console.log(1);
  }
  state = {
    layoutName: 'default',
    input: [],
  };
  onKeyPress = (button) => {
    switch (button) {
      case 'Eng':
        this.setState({
          layoutName: 'lower',
        });
        return;
      case 'Space':
        this.setState({
          input: [...this.state.input, ' '],
        });
        return;
      case '한글':
        this.setState({
          layoutName: 'default',
        });
        return;
      case 'Shift':
        this.setState({
          layoutName: this.state.layoutName === 'lower' ? 'capital' : 'lower',
        });
        return;
      case 'Done':
      case '완료':
        this.setState({
          layoutName: 'default',
        });
        this.props.enterAction();
        this.closeKeyboard();
        return;
      case '지움':
      case 'Del':
        this.setState({ input: this.state.input.slice(0, -1) });
        return;
      case '쌍자음':
      case '쌍자음해제':
        this.handleShift();
        return;
      default:
        this.setState({
          input: [...this.state.input, button],
        });
        return;
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.input.length !== this.state.input.length) {
      this.props.setResult(Hangul.assemble(this.state.input));
    }
  }

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === 'default' ? 'shift' : 'default',
    });
  };

  closeKeyboard = () => {
    this.props.setKeyboard(false);
  };

  submit = () => {
    this.setState({
      submittedData: JSON.stringify(this.state.input),
    });
  };

  render() {
    const { keyOpen } = this.props;
    return (
      <div className={`keyboardContainer ${!keyOpen ? 'hidden' : ''}`}>
        <Keyboard
          keyboardRef={(r) => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          mergeDisplay={true}
          theme={'hg-theme-default hg-layout-default'}
          display={{ '{enter}': 'Enter' }}
          Result={{ '{enter}': '완료' }}
          onChangeAll={() => {}}
          onKeyPress={(button) => this.onKeyPress(button)}
          layout={{
            default: [
              '1 2 3 4 5 6 7 8 9 0',
              'ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ 지움',
              'Eng ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ 완료',
              '쌍자음 ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ 쌍자음',
              'Space',
            ],
            shift: [
              '! @ # $ % ^ & * ( ) - +',
              'ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ 지움',
              'Eng ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ 완료',
              '쌍자음해제 ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ 쌍자음해제',
              'Space',
            ],
            lower: [
              '1 2 3 4 5 6 7 8 9 0',
              '` q w e r t y u i o p Del',
              '한글 a s d f g h j k l Enter',
              'Shift z x c v b n m Shift',
              'Space',
            ],
            capital: [
              '! @ # $ % ^ & * ( ) - +',
              '` Q W E R T Y U I O P Del',
              '한글 A S D F G H J K L Enter',
              'Shift Z X C V B N M Shift',
              'Space',
            ],
          }}
          buttonTheme={[
            {
              class: 'hg-enter',
              buttons: 'Enter 완료',
            },
            {
              class: 'hg-shift',
              buttons: '쌍자음해제',
            },
          ]}
        />
      </div>
    );
  }
}

URKeyboard.defaultProps = {
  keyboardOpen: false,
  setResult: () => {},
  keyOpen: false,
  setKeyboard: () => {},
  enterAction: () => {},
};

export default URKeyboard;
