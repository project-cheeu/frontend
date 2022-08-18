import { EnvironmentOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ModalLayout from 'components/layout/ModalLayout';
import React, { useState } from 'react';
import { MessageAlert } from 'utils';
import './address.css';
import AddressModal from './AddressModal';
// import CityData from 'rowData/AddressData2';
import DaumPostcode from 'react-daum-postcode';
import { URKeyboard } from 'components';
// import CityData from 'rowData/AddressData';

// const { Step } = Steps;

// const cities = CityData.sido;
// const goos = CityData.sigugun;
// const dongs = CityData.dong;

// console.log(goos);
// console.log(dongs);

const Address = ({
  prev,
  next,
  userInfo,
  setUserInfo,
  setLoading,
  setAudio,
}) => {
  /* State */
  const [customer_addr, setCustomer_addr] = useState();
  const [modal, setModal] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [keyword, setKeyword] = useState('');
  // const [goosList] = useState(goos);
  // const [dongList] = useState(dongs);
  // const [select, setSelect] = useState('city');
  // const [list, setList] = useState([]);
  // const [current, setCurrent] = useState(0);

  /* Hooks */
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src =
  //     'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  //   script.id = 'daum-post-code-api';
  //   document.body.appendChild(script);
  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   setList(addressList());
  //   // eslint-disable-next-line
  // }, [select]);

  /* Functions */

  const handleAddr = (data) => {
    const { address, buildingName, zonecode } = data;
    setCustomer_addr(`${address} ${buildingName}(${zonecode})`);
    setAudio('confirm');
    setModal(true);
    // new window.daum.Postcode({
    //   onComplete: (data) => {
    //     const { address, buildingName, zonecode } = data;
    //     setCustomer_addr(`${address} ${buildingName}(${zonecode})`);
    //     // setCompanyInfo({
    //     //   ...companyInfo,
    //     //   company_addr: `${address} ${buildingName}(${zonecode})`,
    //     // });
    //   },
    // }).open();
  };

  const handleNext = async () => {
    setAudio('terms');
    await next(customer_addr);
    // const { city, goo, dong } = customer_addr;
    // if (city !== '' && goo !== '' && dong !== '') {
    //   setAudio('terms');
    //   await next(`${city.codeNm} ${goo.codeNm} ${dong.codeNm}`);
    // }
  };

  const handleForceNext = async () => {
    setAudio('terms');
    await next('없음');
  };

  const handleToggle = () => {
    setToggle(false);
    setKeyword('');
  };

  const handleCancel = () => {
    setModal(false);
    handleToggle();
    setCustomer_addr('');
    MessageAlert.warning('주소를 다시 선택해주세요.');
  };

  // const handleCancel = () => {
  //   setModal(false);
  //   setCurrent(0);
  //   setCustomer_addr({
  //     city: undefined,
  //     goo: undefined,
  //     dong: undefined,
  //   });
  //   setSelect();
  //   MessageAlert.warning('주소를 다시 선택해주세요.');
  // };

  // const handleCityChange = (key, value) => {
  //   setLoading();
  //   setCustomer_addr({
  //     ...customer_addr,
  //     city: { sido: key, codeNm: value },
  //     dong: null,
  //   });
  //   setSelect('goo');
  //   setCurrent(1);
  // };

  // const handleGooChange = (key, value) => {
  //   setLoading();
  //   setCustomer_addr({
  //     ...customer_addr,
  //     goo: { sigugun: key, codeNm: value },
  //   });
  //   setSelect('dong');
  //   setCurrent(2);
  // };

  // const handleDongChange = (key, value) => {
  //   setLoading();
  //   setCustomer_addr({ ...customer_addr, dong: { dong: key, codeNm: value } });
  //   setAudio('confirm');
  //   setModal(true);
  // };

  // const addressList = () => {
  //   switch (select) {
  //     case 'goo':
  //       const gList = goosList
  //         .filter((item) => item.sido === customer_addr.city.sido)
  //         .map((item) => {
  //           const { sigugun, codeNm } = item;
  //           return (
  //             <div
  //               key={sigugun}
  //               className={
  //                 customer_addr.goo && customer_addr.goo.codeNm === codeNm
  //                   ? 'card active'
  //                   : 'card'
  //               }
  //               onClick={() => handleGooChange(sigugun, codeNm)}
  //             >
  //               {codeNm}
  //             </div>
  //           );
  //         });

  //       return gList;
  //     case 'dong':
  //       const dList = dongList.filter((item) => {
  //         const { sido, sigugun } = item;
  //         return (
  //           sido === customer_addr.city.sido &&
  //           sigugun === customer_addr.goo.sigugun
  //         );
  //       });

  //       if (dList.length === 0) {
  //         return (
  //           <div
  //             className="card active"
  //             onClick={() => handleDongChange(0, '')}
  //           >
  //             다음
  //           </div>
  //         );
  //       } else {
  //         const ddList = dList.map((item) => {
  //           const { dong, codeNm } = item;
  //           return (
  //             <div
  //               className={
  //                 customer_addr.dong && customer_addr.dong.codeNm === codeNm
  //                   ? 'card active'
  //                   : 'card'
  //               }
  //               key={dong}
  //               onClick={() => handleDongChange(dong, codeNm)}
  //             >
  //               {codeNm}
  //             </div>
  //           );
  //         });
  //         return ddList;
  //       }
  //     case 'city':
  //     default:
  //       const cList = cities.map((item) => {
  //         const { sido, codeNm } = item;
  //         return (
  //           <div
  //             key={sido}
  //             className={codeNm === customer_addr.city ? 'card active' : 'card'}
  //             onClick={() => handleCityChange(sido, codeNm)}
  //           >
  //             {codeNm}
  //           </div>
  //         );
  //       });
  //       return cList;
  //   }
  // };

  // const onStepChange = (val) => {
  //   setCurrent(val);
  // };

  return (
    <div className="address-container">
      <div className="left-side">
        <EnvironmentOutlined className="icon" />
        <div className="title">
          접수하시는 분의 소중한
          <div className="strong">주소</div>를 입력해주세요
        </div>
      </div>
      <div className="right-side">
        {toggle ? (
          <>
            <DaumPostcode
              onComplete={handleAddr}
              defaultQuery={keyword}
              height="80%"
            />
            <div
              style={{
                width: '100%',
                height: '20%',
                padding: '1vw',
              }}
            >
              <Button
                style={{ widtdh: '100%', height: '100%', fontSize: '2.5vw' }}
                block
                onClick={handleToggle}
              >
                다시 검색
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="input-box">
              <input
                type="text"
                className="input-field-area input-name"
                name="customer_addr"
                placeholder="예) 대학로 164"
                maxLength="6"
                value={keyword}
                // onChange={(e) => setUserInfo(e.target.name, e.target.value)}
                autoFocus
                readOnly
                autoComplete="off"
                onFocus={() => setKeyboardOpen(true)}
              />
            </div>

            <div style={{ width: '100%' }}>
              <URKeyboard
                keyOpen={keyboardOpen}
                setKeyboard={setKeyboardOpen}
                setResult={(val) => setKeyword(val)}
                enterAction={() => setToggle(true)}
              />
            </div>
          </>
        )}
        <Button
          size="large"
          style={{
            margin: '1%',
            width: '90%',
            height: '150px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
          danger
          block
          onClick={() => handleForceNext()}
        >
          넘어가기
        </Button>
      </div>
      <ModalLayout
        width="70vw"
        title="주소 확인"
        modal={modal}
        setModal={setModal}
      >
        <AddressModal
          customer_addr={customer_addr}
          submitAction={handleNext}
          cancelAction={handleCancel}
        />
      </ModalLayout>
    </div>
  );
};

export default Address;
