/* eslint-disable */
import React, { useEffect } from 'react';
import { URAuthApi } from 'api';
import { AppLayout } from 'components';
import { useAppDispatch, useAppState } from 'context/MainContext';
import { LOGOUT, PLAY_AUDIO } from 'context/MainReducer';
import { Route, Switch, useHistory } from 'react-router-dom';
import { getCookie } from 'utils';
import { Main, Medical, Presurvey, Signup, Status, Survey, Agreement } from '.';
import ResultPage from './ResultPage';
import useSound from 'use-sound';
import STARTING from 'assets/starting.m4a';
import PHONE from 'assets/phone-confirm.m4a';
import NAME from 'assets/name.m4a';
import DONE from 'assets/done.m4a';
import REGIST_NUM from 'assets/regist_num.m4a';
import ADDRESS from 'assets/address.m4a';
import TERMS from 'assets/terms.m4a';
import CONFIRM from 'assets/confirm.m4a';
import NOTIFICATION from 'assets/alert01.wav';
import { isMobile } from 'react-device-detect';

const Tablet = (props) => {
  const { audioList } = useAppState();
  const [starting, startingOptions] = useSound(STARTING, {
    interrupt: true,
  });
  const [name, nameOption] = useSound(NAME, { interrupt: true });
  const [phone, phoneOption] = useSound(PHONE, {
    interrupt: true,
  });
  const [done, doneOption] = useSound(DONE, { interrupt: true });
  const [registNum, registNumOption] = useSound(REGIST_NUM, {
    interrupt: true,
  });
  const [address, addressOption] = useSound(ADDRESS, { interrupt: true });
  const [terms, termsOption] = useSound(TERMS, { interrupt: true });
  const [confirm, confrimOption] = useSound(CONFIRM, { interrupt: true });
  const [notificationAlert, notificationAlertOption] = useSound(NOTIFICATION, {
    loop: true,
  });

  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    checkSession();
    handlePlay('');
    // initalSound();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    handlePlay(audioList);
  }, [audioList]);

  const handlePlay = async (aud) => {
    startingOptions.stop();
    nameOption.stop();
    phoneOption.stop();
    doneOption.stop();
    registNumOption.stop();
    addressOption.stop();
    termsOption.stop();
    confrimOption.stop();
    notificationAlertOption.stop();
    switch (aud) {
      case 'phone':
        phone();
        break;
      case 'name':
        name();
        break;
      case 'starting':
        starting();
        break;
      case 'done':
        done();
        break;
      case 'registNum':
        registNum();
        break;
      case 'address':
        address();
        break;
      case 'terms':
        terms();
        break;
      case 'confirm':
        confirm();
        break;
      case 'notificationAlert':
        notificationAlert();
        break;
      default:
        startingOptions.stop();
        nameOption.stop();
        phoneOption.stop();
        doneOption.stop();
        registNumOption.stop();
        addressOption.stop();
        termsOption.stop();
        confrimOption.stop();
        notificationAlertOption.stop();
        dispatch({ type: PLAY_AUDIO, payload: '' });
        return;
    }
  };

  const checkSession = async () => {
    const session = JSON.parse(getCookie('member'));

    if (!session) {
      console.log('tablet-session2', 1);
      history.replace('/');
      return false;
    }

    const token = getCookie('token');
    const verify = await URAuthApi.verifyToken(token);
    if (!verify) {
      dispatch({ type: LOGOUT });
      return false;
    }
    // if (isMobile) {
    //   history.replace('/t');
    // } else {
    //   history.replace('/d');
    // }
    return true;
  };
  return (
    <Switch>
      <AppLayout>
        <Route path="/t" exact component={Main} />
        <Route path="/t/signup" component={Signup} />
        <Route path="/t/status" component={Status} />
        <Route path="/t/presurvey" component={Presurvey} />
        <Route path="/t/survey" component={Survey} />
        <Route path="/t/medical" component={Medical} />
        <Route path="/t/done" component={ResultPage} />
        <Route path="/t/agreement/:customer_id" component={Agreement} />
      </AppLayout>
    </Switch>
  );
};

export default Tablet;
