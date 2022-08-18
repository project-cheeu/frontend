import React from 'react';

import { AdminGrid } from 'components';
import { Tabs } from 'antd';
import { MultipleRegist, SingleRegist } from './components';

const { TabPane } = Tabs;

const CustomerRegistPresenter = () => {
  return (
    <AdminGrid>
      <Tabs defaultActiveKey="1">
        <TabPane tab="고객 개별 등록" key="1">
          <SingleRegist />
        </TabPane>
        <TabPane tab="고객 다수 등록" key="2">
          <MultipleRegist />
        </TabPane>
      </Tabs>
    </AdminGrid>
  );
};

export default CustomerRegistPresenter;
