import React, { useEffect, useState } from 'react';
import CustomerStatisticsPresenter from './CustomerStatisticsPresenter';
import moment from 'moment';
import { URStatisticsApi } from 'api';
import { v4 } from 'uuid';

// eslint-disable-next-line
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CustomerStatisticsContainer = () => {
  const [statistics, setStatistics] = useState([]);
  const [medical_date, setMedical_date] = useState(undefined);
  const [dateType, setDateType] = useState('year');
  const [gender, setGender] = useState(-1);
  const [older, setOlder] = useState(0);

  const getStatistics = async () => {
    switch (dateType) {
      case 'date':
        await getStatisticsByDate();
        break;
      case 'month':
        await getStatisticsByMonth();
        break;
      case 'year':
      default:
        await getStatisticsByYear();
        break;
    }
  };

  const getStatisticsByYear = async () => {
    console.log(1);
    let date;
    if (medical_date) {
      date = moment(medical_date).format('yyyy');
    } else {
      date = moment().format('yyyy');
    }
    const result = await URStatisticsApi.getCustomerCountByYear({
      type: 'y',
      start_date: date,
      end_date: 0,
      gender: gender,
      older: 0,
    });
    if (result) {
      const temp = result.map((item) => {
        const { customer_count } = item;
        return { ...item, id: v4(), 환자수: customer_count };
      });
      setStatistics(temp);
    }
  };

  const getStatisticsByMonth = async () => {
    let date;
    if (medical_date) {
      date = moment(medical_date).format('yyyy-MM');
    } else {
      date = moment().format('yyyy-MM');
    }
    const result = await URStatisticsApi.getCustomerCountByYear({
      type: 'm',
      start_date: date,
      end_date: 0,
      gender: gender,
      older: 0,
    });
    if (result) {
      const temp = result.map((item) => {
        const { customer_count } = item;
        return { ...item, id: v4(), 환자수: customer_count };
      });
      setStatistics(temp);
    }
  };

  const getStatisticsByDate = async () => {
    if (!Array.isArray(medical_date)) {
      return;
    }
    const [start_date, end_date] = medical_date;
    const result = await URStatisticsApi.getCustomerCountByYear({
      type: 'd',
      start_date: moment(start_date).format('yyyy-MM-DD'),
      end_date: moment(end_date).format('yyyy-MM-DD'),
      gender: gender,
      older: 0,
    });
    if (result) {
      const temp = result.map((item) => {
        const { customer_count } = item;
        return { ...item, id: v4(), 환자수: customer_count };
      });
      setStatistics(temp);
    }
  };

  // useEffect(() => {
  //   setMedical_date(moment());
  // }, []);

  useEffect(() => {
    getStatistics();
    // getStatisticsByYear();
    // eslint-disable-next-line
  }, [dateType, medical_date, gender]);

  return statistics ? (
    <CustomerStatisticsPresenter
      statistics={statistics}
      medical_date={medical_date}
      setMedical_date={setMedical_date}
      dateType={dateType}
      setDateType={setDateType}
      gender={gender}
      setGender={setGender}
      older={older}
      setOlder={setOlder}
    />
  ) : (
    ''
  );
};

export default CustomerStatisticsContainer;
