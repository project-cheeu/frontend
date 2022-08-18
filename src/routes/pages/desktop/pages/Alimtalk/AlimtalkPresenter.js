import {
  Card,
  Descriptions,
  Popover,
  Radio,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import moment from 'moment';
import { AdminGrid } from 'components';
import React, { useEffect, useState } from 'react';
import AlimtalkCode from 'rowData/AlimtalkCode';

const columns = [
  {
    title: 'NO',
    dataIndex: 'medical_id',
    render: (a, b, idx) => {
      return idx + 1;
    },
  },
  {
    title: '결과',
    dataIndex: 'apiResult',
    render: (apiResult) => {
      return apiResult ? (
        <Tag color="#87d068">성공</Tag>
      ) : (
        <Tag color="#f50">실패</Tag>
      );
    },
  },
  {
    title: '전송자',
    dataIndex: 'sender_nm',
    render: (sender_nm) => {
      return sender_nm;
    },
  },
  {
    title: '수신자',
    dataIndex: 'receiver_nm',
    render: (receiver_nm, obj) => {
      const { content } = obj;
      const [{ phn }] = JSON.parse(content);
      return `${receiver_nm}(${phn})`;
    },
  },
  {
    title: '내용',
    dataIndex: 'content',
    render: (content) => {
      const [{ msg }] = JSON.parse(content);
      return (
        <Popover
          placement="rightBottom"
          trigger="click"
          content={msg.split('\n').map((line) => {
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}
        >
          {msg.slice(0, 35)}...
        </Popover>
      );
    },
  },
  {
    title: '전송일시',
    dataIndex: 'created_at',
    render: (created_at) => {
      return moment(created_at * 1000).format('llll');
    },
  },
  {
    title: '기타',
    dataIndex: 'resultDetail',
    render: (resultDetail) => {
      const [{ message }] = JSON.parse(resultDetail);

      const [statusCode] = message.split(':');
      const [temp] = AlimtalkCode.filter((item) => {
        const { code } = item;
        return code === statusCode;
      });

      return `${temp.message}(${message})`;
    },
  },
];

const AlimtalkPresenter = ({ alimtalk }) => {
  const [displayList, setDisplayList] = useState([]);
  const [filter, setFilter] = useState({ apiResult: '', created_at: '' });
  useEffect(() => {
    handleFilterList();
    // eslint-disable-next-line
  }, [alimtalk, filter]);

  const handleFilterList = () => {
    const { apiResult, created_at } = filter;
    const temp = alimtalk.filter((item) => {
      console.log(item.apiResult);
      if (apiResult === '' && created_at === '') {
        return item;
      }

      return apiResult === item.apiResult;
    });
    setDisplayList(temp);
    console.log(temp);
    console.log(alimtalk);
  };

  return (
    <AdminGrid>
      <Space direction="vertical">
        <Descriptions>
          <Descriptions.Item>
            <Card>
              <Space align="baseline">
                <Typography.Title level={5}>성공여부</Typography.Title>
                <Radio.Group
                  defaultValue={''}
                  onChange={(e) =>
                    setFilter({ ...filter, apiResult: e.target.value })
                  }
                >
                  <Radio value="" defaultChecked>
                    전체
                  </Radio>
                  <Radio value={1}>성공</Radio>
                  <Radio value={0}>실패</Radio>
                </Radio.Group>
              </Space>
            </Card>
          </Descriptions.Item>
        </Descriptions>

        <Typography.Text>
          전체 <Typography.Text code>{displayList.length}</Typography.Text> 건
        </Typography.Text>

        <Table
          bordered
          columns={columns}
          dataSource={displayList}
          onRow={(item) => {
            return {
              onClick: () => {
                item.fold = !item.fold;
              },
            };
          }}
        />
      </Space>
    </AdminGrid>
  );
};

export default AlimtalkPresenter;
