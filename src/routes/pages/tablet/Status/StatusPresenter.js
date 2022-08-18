import { PatientTable } from './components';
import Hangul from 'hangul-js';
import React, { useState, useEffect } from 'react';
import './status.css';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { CustomerModal } from 'components/layout';
import { MessageAlert } from 'utils';
import { URMedicalApi } from 'api';
import { SURVEY_CUSTOMER } from 'context/MainReducer';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'context/MainContext';
import moment from 'moment';
import { AutoComplete, Button, DatePicker } from 'antd';
import { v4 } from 'uuid';
import _ from 'lodash';
const { Option } = AutoComplete;

/**
 * @title Admin 프레젠터
 * @description 관리자 화면 페이지 프레젠터
 */
const StatusPresenter = ({
  medicalList,
  customer,
  getCustomerDetail,
  getMedicalInfo,
  setCustomer,
}) => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterDate, setFilterDate] = useState(moment());
  const [filterdList, setFilterdList] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (filterName !== '') {
      return;
    }
    if (!filterDate) {
      const temp = medicalList.map((item) => {
        const { customer_nm } = item;
        var dis = Hangul.disassemble(customer_nm, true);
        const cho = dis.reduce((prev, elem) => {
          elem = elem[0] ? elem[0] : elem;
          return prev + elem;
        }, '');
        item.dissemble = cho;
        return item;
      });
      setFilterdList(temp);
    } else {
      const temp = medicalList.filter((item) => {
        const { created_at, customer_nm } = item;
        var dis = Hangul.disassemble(customer_nm, true);
        const cho = dis.reduce((prev, elem) => {
          elem = elem[0] ? elem[0] : elem;
          return prev + elem;
        }, '');
        item.dissemble = cho;
        return (
          moment.unix(created_at).format('ll') ===
          moment(filterDate).format('ll')
        );
      });
      setFilterdList(temp);
    }
    // eslint-disable-next-line
  }, [filterDate, medicalList, filterName, search]);

  const handleSearch = async () => {
    if (search) {
      const search1 = Hangul.disassemble(search).join('');
      const temp = _.uniqBy(filterdList, 'customer_id').filter((item) => {
        return (
          item.customer_nm.includes(search) ||
          item.dissemble.includes(search1) ||
          item.customer_num.includes(search)
        );
      });

      setOptions(temp);
    } else {
      setFilterName('');
      await getMedicalInfo();
    }
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [search]);

  const handleFilterName = async () => {
    if (filterName !== '') {
      const temp = filterdList.filter((item) => {
        const { customer_id } = item;
        return customer_id === filterName;
      });
      setFilterdList(temp);
    } else {
      await getMedicalInfo();
    }
  };

  useEffect(() => {
    handleFilterName();
    // eslint-disable-next-line
  }, [filterName]);

  const customerDetail = async (item) => {
    await setVisible(true);
    await getCustomerDetail(item);
  };

  const handleChangeStatus = async (type) => {
    const { medical_id } = customer;
    const result = await URMedicalApi.updateMedicalStatus({
      medical_status: type,
      medical_id,
    });
    if (result) {
      setCustomer({ ...customer, medical_status: type });
      MessageAlert.success('변경완료');
      await getMedicalInfo();
    } else {
      MessageAlert.error('변경 실패');
    }
  };

  // eslint-disable-next-line
  const handlePreSurvey = () => {
    const { customer_id, medical_id } = customer;
    dispatch({ type: SURVEY_CUSTOMER, payload: { medical_id, customer_id } });
    history.push('/t/presurvey');
  };

  // eslint-disable-next-line
  const handleSurvey = () => {
    const { customer_id, medical_id } = customer;
    dispatch({ type: SURVEY_CUSTOMER, payload: { medical_id, customer_id } });
    history.push('/t/survey');
  };

  const onChange = (e) => {
    setSearch(e);
  };

  const onSelect = (selectValue, self) => {
    // console.log('onSelect', key);
    // console.log('onSelect2', self);
    const { key } = self;
    setFilterName(key);
  };

  return medicalList ? (
    <div className="status-presenter">
      <div className="left-side">
        <UsergroupAddOutlined className="icon" />
        <div className="title">
          <div className="strong">고객정보</div>진료일자를 선택해주세요.
          <div>
            <DatePicker
              allowClear={false}
              style={{ width: '100%' }}
              onChange={(e) => {
                setFilterDate(e);
                setOpen(false);
              }}
              size="large"
              value={filterDate}
              defaultValue={false}
              open={open}
              onClick={() => setOpen(true)}
              renderExtraFooter={() => (
                <Button
                  block
                  type="link"
                  onClick={() => {
                    setFilterDate(false);
                    setOpen(false);
                  }}
                >
                  전체 목록
                </Button>
              )}
            />
            <div>
              <AutoComplete
                // options={options}
                style={{
                  width: 280,
                }}
                onChange={onChange}
                onSelect={onSelect}
                size="large"
                placeholder="고객명"
                allowClear={true}
              >
                {options.map((item) => {
                  const { customer_id, customer_nm, customer_num } = item;
                  const [num] = customer_num.split('-');
                  return (
                    <Option key={customer_id} value={customer_nm}>
                      {customer_nm}({num})
                    </Option>
                  );
                })}
              </AutoComplete>
              {/* {JSON.stringify(options)} */}
            </div>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="table-wrapper">
          <PatientTable
            medicalList={filterdList}
            onClick={customerDetail}
            rowKey={() => v4()}
          />
        </div>
      </div>
      {customer && (
        <CustomerModal
          customer_id={customer.customer_id}
          modal={visible}
          setModal={setVisible}
          changeStatus={handleChangeStatus}
          startPresurvey={handlePreSurvey}
          startSurvey={handleSurvey}
          medical_status={customer.medical_status}
        />
      )}
    </div>
  ) : (
    ''
  );
};

export default StatusPresenter;
