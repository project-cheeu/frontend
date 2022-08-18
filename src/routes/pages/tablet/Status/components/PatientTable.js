import { v4 } from 'uuid';
import { Table } from 'antd';
import { rrn, timeConversion, TypeManager } from 'utils';
import moment from 'moment';

const tableColumn = [
  {
    title: 'NO',
    dataIndex: 'idx',
    render: (a, b, idx) => {
      return idx + 1;
    },
  },
  {
    title: '이름',
    dataIndex: 'customer_nm',
  },
  {
    title: '주민등록번호',
    dataIndex: 'customer_num',
    render: (customer_num) => {
      return rrn(customer_num);
    },
  },
  {
    title: '휴대폰번호',
    dataIndex: 'customer_tel',
  },
  {
    title: '성별',
    dataIndex: 'customer_num',
    render: (customer_num) => {
      return parseInt(customer_num.substring(7, 8)) % 2 === 1 ? '남' : '여';
    },
  },
  {
    title: '나이',
    dataIndex: 'customer_num',
    render: (customer_num) => {
      const year = parseInt(customer_num.substring(0, 2));
      const birth = year > 0 ? 1900 + year : 2000 + year;
      return new Date().getFullYear() - birth;
    },
  },
  {
    title: '상태',
    dataIndex: 'medical_status',
    render: (medical_status) => {
      const { color, value, textDecoration } =
        TypeManager.getStatusType(medical_status);
      return (
        <div style={{ color: color, textDecoration: textDecoration }}>
          {value}
        </div>
      );
    },
  },
  {
    title: '접수시간',
    dataIndex: 'created_at',
    render: (created_at) => {
      return timeConversion(created_at * 1000, 'hh:mm');
    },
  },
  {
    title: '대기중인 시간',
    dataIndex: 'completed_at',
    render: (completed_at, row) => {
      const { created_at } = row;
      if (completed_at) {
        return parseInt((completed_at - created_at) / 60) + '분';
        // return (
        //   moment(
        //     moment(completed_at * 1000) - moment(created_at * 1000)
        //   ).format('mm') + '분'
        // );
      }
      // return moment(created_at * 1000).format('mm') + '분';
      return parseInt(moment(moment() / 1000 - created_at) / 60) + '분';
    },
  },
  {
    title: '내원횟수',
    dataIndex: 'medical_count',
  },
];

/**
 * @title 진료현황판 테이블
 * @description 관리자 페이지의 진료현황 테이블 컴포넌트
 * @param medicalList 진료 데이터 배열
 */
const PatientTable = ({ medicalList, onClick }) => {
  return (
    medicalList && (
      <Table
        dataSource={medicalList}
        columns={tableColumn}
        bordered
        pagination={false}
        sticky={true}
        scroll={{ y: '90vh' }}
        onRow={(item) => {
          return { onClick: () => onClick(item) };
        }}
        rowKey={() => v4()}
      />
    )
  );
};

PatientTable.defaultProps = {
  onClick: () => {},
};

export default PatientTable;
