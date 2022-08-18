import { AdminGrid } from 'components';
import React from 'react';
import PieChart from './components/PieChart';
const data = [
  {
    id: 'css',
    label: 'css',
    value: 258,
    color: 'hsl(333, 70%, 50%)',
  },
  {
    id: 'elixir',
    label: 'elixir',
    value: 397,
    color: 'hsl(93, 70%, 50%)',
  },
  {
    id: 'rust',
    label: 'rust',
    value: 134,
    color: 'hsl(70, 70%, 50%)',
  },
  {
    id: 'haskell',
    label: 'haskell',
    value: 342,
    color: 'hsl(335, 70%, 50%)',
  },
  {
    id: 'javascript',
    label: 'javascript',
    value: 534,
    color: 'hsl(73, 70%, 50%)',
  },
];
const SurveyStatisticsPresenter = ({ statistics }) => {
  /* Router */
  /* State */
  /* Hooks */
  /* Functions */
  /* Render */
  return (
    <AdminGrid>
      <div style={{ width: '100%', height: '70vh' }}>
        {/* <Space direction="vertical" style={{ width: '100%' }}>
      <Card bordered>
        <Space style={{ width: '100%' }} direction="vertical">
          <Space align="baseline" size="large">
            <Typography.Title level={4}>기간별</Typography.Title>
            <Select value={dateType} onChange={setDateType}>
              <Option value="year">년별</Option>
              <Option value="month">월별</Option>
              <Option value="date">일별</Option>
            </Select>
            <PickerWithType
              type={dateType}
              onChange={onChange}
              value={medical_date}
            />
          </Space>
          <Space align="baseline" size="large">
            <Typography.Title level={4}>성별</Typography.Title>
            <Select
            //  defaultValue={gender} onChange={setGender}
             >
              <Option value={-1}>전체</Option>
              <Option value={0}>남성</Option>
              <Option value={1}>여성</Option>
            </Select>
          </Space>

        </Space>
      </Card>
    </Space> */}

        {statistics ? (
          <PieChart data={data} keys={['환자수']} />
        ) : (
          '등록된 설문이 없습니다.'
        )}
      </div>
    </AdminGrid>
  );
};

export default SurveyStatisticsPresenter;
