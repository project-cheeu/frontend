import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import * as XLSX from 'xlsx';
import moment from 'moment';
import {
  Typography,
  message,
  Upload,
  Table,
  Space,
  Button,
  Alert,
  Popover,
  Image,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { base_url, MessageAlert, timeConversion } from 'utils';
import { useAppDispatch, useAppState } from 'context/MainContext';
import _ from 'lodash';
import { URCustomerApi } from 'api';
import EXAMPLE from 'assets/multipleExample.png';
import { SET_LOADING } from 'context/MainReducer';

const { Dragger } = Upload;
const { Text } = Typography;

const columns = [
  {
    title: '순번',
    dataIndex: 'customer_nm',
    render: (value, row, idx) => {
      return idx + 1;
    },
  },
  {
    title: '고객명',
    dataIndex: 'customer_nm',
    render: (value, row, idx) => {
      return value;
    },
  },
  {
    title: '고객 주민등록번호',
    dataIndex: 'customer_num',
    render: (value, row, idx) => {
      return value;
    },
  },
  {
    title: '고객 전화번호',
    dataIndex: 'customer_tel',
    render: (value, row, idx) => {
      return value;
    },
  },
  {
    title: '최초내원일',
    dataIndex: 'created_at',
    render: (value, row, idx) => {
      return timeConversion(value * 1000, 'll');
    },
  },
  {
    title: '최종내원일',
    dataIndex: 'modified_at',
    render: (value, row, idx) => {
      return timeConversion(value * 1000, 'll');
    },
  },
];
const MultipleRegist = (props) => {
  /* State */
  const { company } = useAppState();
  const { company_id } = company;
  const [uploadFile, setUploadFile] = useState(undefined);
  const [dumpList, setDumpList] = useState([]);

  /**
   * antd 파일 속성
   */
  const fileProps = {
    name: 'files',
    method: 'post',
    action: `${base_url}/upload/parser/${company_id}`,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setUploadFile(info.file.originFileObj);
        message.success(`${info.file.name} 파일 업로드 완료.`);
      } else if (status === 'error') {
        setUploadFile(undefined);
        message.error(`${info.file.name} 파일 업로드 실패.`);
      }
    },
  };

  /* Hooks */
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (uploadFile) {
      dispatch({ type: SET_LOADING, payload: true });
    }
    handleFile(uploadFile);
    // eslint-disable-next-line
  }, [uploadFile]);

  /* Functions */

  /**
   *파일 업로드
   */
  const handleFile = async (file) => {
    if (typeof file !== 'object') {
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws);
      handleSetFileUpload(dataParse)
        .then((res) => {
          setDumpList(res);
          dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((err) => {
          MessageAlert.error(err);
        });
    };
    reader.readAsBinaryString(file);
  };

  /**
   *파일 업로드시 고객 정보 파싱
   */
  const handleSetFileUpload = (data) =>
    new Promise((resolve, reject) => {
      console.log(data.length);
      if (data.length >= 10000) {
        setDumpList([]);
        setUploadFile(undefined);
        reject('데이터의 양이 너무 많습니다.');

        return;
      }
      const result = data
        // eslint-disable-next-line
        .filter((item) => {
          const { customer_num, customer_nm, customer_tel, created_at } = item;
          if (
            customer_num !== '' &&
            customer_tel &&
            customer_tel.length >= 13 &&
            customer_nm !== ''
          ) {
            item.created_at = moment(created_at).unix();
            return item;
          }
        })
        .map((item) => {
          const { customer_num, customer_nm, customer_tel, created_at } = item;
          const newItem = {
            id: v4(),
            customer_num: customer_num,
            customer_nm: customer_nm,
            customer_tel: customer_tel,
            created_at: created_at,
            agree_date: moment().unix(),
            modified_at: moment().unix(),
            company_id,
          };
          return newItem;
        });
      if (result.length !== 0) {
        resolve(result);
      } else {
        reject('회원정보와 일치하지 않음');
      }
    });

  /**
   * 파일 파싱 취소
   */
  const handleCancel = () => {
    setDumpList([]);
    setUploadFile(undefined);
  };

  /**
   * 고객 벌크 입력
   */
  const onBulkCustomer = async () => {
    await dispatch({ type: SET_LOADING, payload: true });
    const tempChief = _.uniqBy(dumpList, 'customer_tel');

    const chiefList = tempChief.map((item) => {
      const { customer_tel, customer_nm } = item;
      return { customer_tel, customer_nm };
    });
    const postData = {
      chiefList,
      customerList: dumpList,
    };

    const result = await URCustomerApi.insertBulkCustomer(postData);
    if (result) {
      MessageAlert.success('등록 성공');
      handleCancel();
    } else {
      MessageAlert.error('등록 실패, 파일 양식을 확인하세요.');
    }
    await dispatch({ type: SET_LOADING, payload: false });
  };
  return (
    <>
      <div style={{ padding: '1vh 0 2vh 0' }}>
        {uploadFile ? (
          <Alert
            message={<>{uploadFile.name}</>}
            description={`${uploadFile.name}에서 ${dumpList.length}명의 환자정보를 추출하였습니다.`}
            type="success"
            showIcon
          />
        ) : (
          <Alert
            message={<>환자 정보 추출을 위해 엑셀(XLSX)파일을 준비해주세요.</>}
            description={
              <Popover
                placement="rightTop"
                content={
                  <>
                    <div>
                      <Typography style={{ fontSize: '1.5em' }}>
                        엑셀 파일의 컬럼 중
                      </Typography>
                      <Typography style={{ fontSize: '1.5em' }}>
                        <Text strong>환자명</Text>을{' '}
                        <Text code>customer_nm</Text>으로,
                      </Typography>
                      <Typography style={{ fontSize: '1.5em' }}>
                        <Text strong>주민등록번호</Text>를{' '}
                        <Text code>customer_num</Text>으로,
                      </Typography>
                      <Typography style={{ fontSize: '1.5em' }}>
                        <Text strong>환자 주소</Text>를{' '}
                        <Text code>customer_addr</Text>으로,
                      </Typography>
                      <Typography style={{ fontSize: '1.5em' }}>
                        <Text strong>환자 휴대폰번호</Text>를{' '}
                        <Text code>customer_tel</Text>으로,
                      </Typography>
                      <Typography style={{ fontSize: '1.5em' }}>
                        <Text strong>환자 최초 내원일</Text>을{' '}
                        <Text code>created_at</Text>으로
                      </Typography>
                      <Typography style={{ fontSize: '1.5em' }}>
                        바꾸어 주세요.
                      </Typography>
                    </div>
                    <div>
                      <Image alt="예제" preview={false} src={EXAMPLE} />
                    </div>
                  </>
                }
                title="엑셀의 컬럼명을 다음과 같이 변경해주세요!"
              >
                <Button type="default" size="large">
                  환자 정보 준비시 유의사항
                </Button>
              </Popover>
            }
            type="info"
            showIcon
          />
        )}
      </div>

      {dumpList.length === 0 ? (
        <div style={{ width: '100%', height: '500px' }}>
          <Dragger {...fileProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              클릭하거나 파일을 이 영역에 드래그하세요.
            </p>
            <p className="ant-upload-hint">
              고객 정보를 하나씩 입력하려면 개별 등록 탭을 이용해주세요.
            </p>
          </Dragger>
        </div>
      ) : (
        <>
          <Table
            bordered
            columns={columns}
            dataSource={dumpList}
            pagination={false}
            scroll={{ y: 500 }}
          />
          <Space
            style={{
              width: '100%',
              padding: '1vh 0',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button size="large" danger onClick={handleCancel}>
              취소하기
            </Button>
            <Button size="large" type="primary" onClick={onBulkCustomer}>
              등록하기
            </Button>
          </Space>
        </>
      )}
    </>
  );
};

export default MultipleRegist;
