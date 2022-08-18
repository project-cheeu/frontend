/* eslint-disable */
import { AdminGrid } from 'components';
import React, { useState } from 'react';
import moment from 'moment';
import {
  Card,
  Checkbox,
  DatePicker,
  Radio,
  Select,
  Space,
  Typography,
} from 'antd';
import { BarChart } from './components';

const { RangePicker } = DatePicker;
const { Option } = Select;

const CustomerStatisticsPresenter = ({
  statistics,
  medical_date,
  setMedical_date,
  dateType,
  setDateType,
  gender,
  setGender,
  older,
  setOlder,
}) => {
  const [legendType, setLegendType] = useState('all');

  const options = [
    { label: '신환', value: 'new' },
    { label: '구환', value: 'old' },
    { label: '예약', value: 'reserve' },
  ];

  const handleSetLegend = (e) => {};

  const onChange = (dates) => {
    setMedical_date(dates);
  };

  const PickerWithType = ({ type, onChange, value }) => {
    switch (type) {
      case 'date':
        return (
          <RangePicker picker={type} value={medical_date} onChange={onChange} />
        );
      default:
        return (
          <DatePicker picker={type} value={medical_date} onChange={onChange} />
        );
    }
  };

  return (
    <AdminGrid>
      <div style={{ width: '100%', height: '70vh' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card bordered>
            <Space style={{ width: '100%' }} direction="vertical">
              <Space align="baseline" size="large">
                <Typography.Title level={4}>기간별</Typography.Title>
                <Select value={dateType} onChange={setDateType}>
                  <Option value="year">년별</Option>
                  <Option value="month">월별</Option>
                  <Option value="date">일별</Option>
                  {/* <Option value="quarter">분기별</Option> */}
                </Select>
                <PickerWithType
                  type={dateType}
                  onChange={onChange}
                  value={medical_date}
                />
              </Space>
              <Space align="baseline" size="large">
                <Typography.Title level={4}>성별</Typography.Title>
                <Select defaultValue={gender} onChange={setGender}>
                  <Option value={-1}>전체</Option>
                  <Option value={0}>남성</Option>
                  <Option value={1}>여성</Option>
                  {/* <Option value="quarter">분기별</Option> */}
                </Select>
              </Space>
              {/* <Space align="baseline" size="large">
                <Typography.Title level={4}>연령별</Typography.Title>
                <Select value={older} onChange={setOlder}>
                  <Option value="year">년별</Option>
                  <Option value="month">월별</Option>
                  <Option value="date">일별</Option>
                </Select>
              </Space> */}
              {/* <Space align="baseline" size="large">
              <Typography.Title level={4}>환자구별</Typography.Title>
              <Checkbox.Group
              options={options}
              defaultValue={['new', 'old', 'reserve']}
              onChange={handleSetLegend}
              />
            </Space> */}
            </Space>
          </Card>
        </Space>

        {statistics ? <BarChart data={statistics} keys={['환자수']} /> : ''}
      </div>
    </AdminGrid>
  );
};

export default CustomerStatisticsPresenter;
