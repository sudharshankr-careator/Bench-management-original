import { useQuery } from '@apollo/client';
import { Descriptions, Spin, Table, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import CONSTANTS from '../../constants';
import ACCOUNT_MANAGER_SERVICE from '../../services/AccountManagerService';

export default function ResourceDetails() {
  const { id } = useParams();
  const dateFormat = 'DD/MM/YYYY';
  function capitalizeWords(string: any) {
    return string.replace(/(?:^|\s)\S/g, function (a: any) {
      return a.toUpperCase();
    });
  }

  const { data, loading, refetch, networkStatus } = useQuery(
    ACCOUNT_MANAGER_SERVICE.RESOURES,
    {
      variables: {
        resourceId: Number(id),
      },
    },
  );
  const dateFormatList = 'DD/MM/YYYY';
  const columns = [
    {
      title: <strong>Sr. No.</strong>,
      dataIndex: 'tableId',
      width: '10%',
    },
    {
      title: <strong>Note</strong>,
      dataIndex: 'notes',
      width: '65%',
    },
    {
      title: <strong>Date</strong>,
      dataIndex: 'createdat',
      render: (val: any) => moment(val).format(dateFormatList),
    },
    {
      title: <strong>Created By</strong>,
      dataIndex: ['user', 'username'],
      width: '20%',
    },
  ];

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      {data && data.resource ? (
        <div>
          <label
            htmlFor=""
            style={{
              fontSize: 'large',
              fontWeight: 'bold',
              marginTop: '0.5rem',
            }}
          >
            {capitalizeWords(data.resource.fullname)}
          </label>
          <div className="admintable">
            <Descriptions bordered size="small">
              <Descriptions.Item label="Employee ID" span={2}>
                {data.resource.empid}
              </Descriptions.Item>
              <Descriptions.Item label="Date Of Join" span={2}>
                {moment(data.resource.doj).format(dateFormat)}
              </Descriptions.Item>
              <Descriptions.Item label="Gender" span={2}>
                {data.resource.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number" span={2}>
                {data.resource.secondaryphonenumber == null
                  ? data.resource.primaryphonenumber
                  : data.resource.primaryphonenumber +
                    ', ' +
                    data.resource.secondaryphonenumber}
              </Descriptions.Item>
              <Descriptions.Item label="Email ID" span={2}>
                {data.resource.emailid}
              </Descriptions.Item>
              <Descriptions.Item label="Personal Email ID" span={2}>
                {data.resource.personalemailid}
              </Descriptions.Item>
              <Descriptions.Item label="Designation" span={2}>
                {data.resource.designation
                  ? capitalizeWords(data.resource.designation)
                  : null}
              </Descriptions.Item>
              <Descriptions.Item label="Skills" span={2}>
                {data.resource.skills ? data.resource.skills.split('| ') : null}
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={2}>
                {data.resource.statuscode == CONSTANTS.STATUS_CODE[0] ? (
                  <Tag
                    color={CONSTANTS.COLORS[0]}
                    key={data.resource.statuscode}
                  >
                    {CONSTANTS.STATUS[0]}
                  </Tag>
                ) : data.resource.statuscode == CONSTANTS.STATUS_CODE[1] ? (
                  <Tag
                    color={CONSTANTS.COLORS[1]}
                    key={data.resource.statuscode}
                  >
                    {CONSTANTS.STATUS[1]}
                  </Tag>
                ) : data.resource.statuscode == CONSTANTS.STATUS_CODE[2] ? (
                  <Tag
                    color={CONSTANTS.COLORS[2]}
                    key={data.resource.statuscode}
                  >
                    {CONSTANTS.STATUS[2]}
                  </Tag>
                ) : data.resource.statuscode == CONSTANTS.STATUS_CODE[3] ? (
                  <Tag
                    color={CONSTANTS.COLORS[3]}
                    key={data.resource.statuscode}
                  >
                    {CONSTANTS.STATUS[3]}
                  </Tag>
                ) : data.resource.statuscode == CONSTANTS.STATUS_CODE[4] ? (
                  <Tag
                    color={CONSTANTS.COLORS[4]}
                    key={data.resource.statuscode}
                  >
                    {CONSTANTS.STATUS[4]}
                  </Tag>
                ) : data.resource.statuscode == CONSTANTS.STATUS_CODE[5] ? (
                  <Tag
                    color={CONSTANTS.COLORS[5]}
                    key={data.resource.statuscode}
                  >
                    {CONSTANTS.STATUS[5]}
                  </Tag>
                ) : null}
              </Descriptions.Item>

              <Descriptions.Item label="Project release date" span={2}>
                {moment(data.resource.projectreleasedate).format(dateFormat)}
              </Descriptions.Item>

              <Descriptions.Item label="Project Release reason" span={3}>
                {data.resource.projectreleasereason
                  ? capitalizeWords(data.resource.projectreleasereason)
                  : null}
              </Descriptions.Item>
              <Descriptions.Item label="Account Name" span={2}>
                {data.resource.accname
                  ? capitalizeWords(data.resource.accname)
                  : null}
              </Descriptions.Item>
              <Descriptions.Item label="Account Manager" span={2}>
                {data.resource.accmanager && data.resource.accmanager.username
                  ? capitalizeWords(data.resource.accmanager.username)
                  : null}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
            <label htmlFor="" style={{ fontSize: 'large', fontWeight: 'bold' }}>
              Notes
            </label>
            <Table
              columns={columns}
              dataSource={
                data.resource
                  ? data.resource.notes.map((val: any, index: any) => ({
                      ...val,
                      tableId: index + 1,
                    }))
                  : null
              }
              rowKey={(record: any) => record?.id}
              scroll={{ x: 1000 }}
              className="admintable"
              bordered
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
