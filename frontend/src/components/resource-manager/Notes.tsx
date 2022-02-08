import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Input, Row, Spin, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NOTE_SERVICE from '../../services/NotesService';
import { Store } from '../../types/Redux';

export default function Notes() {
  const dateFormatList = 'DD/MM/YYYY';

  const [form] = Form.useForm();
  const { id } = useParams();
  const { data, loading, refetch } = useQuery(
    NOTE_SERVICE.NOTES_BY_RESOURCEID,
    {
      variables: {
        resourceid: Number(id),
      },
    },
  );
  const [create] = useMutation(NOTE_SERVICE.CREATE_NOTE);
  const columns = [
    {
      title: 'Sr. No.',
      dataIndex: 'tableId',
      width: '5%',
    },
    {
      title: 'Note',
      dataIndex: 'notes',
      width: '70%',
    },
    {
      title: 'Date',
      dataIndex: 'createdat',
      render: (val: any) => moment(val).format(dateFormatList),
    },
    {
      title: 'Created By',
      dataIndex: ['user', 'username'],
    },
  ];
  useEffect(() => {
    refetch();
  }, []);
  const [createbutton, setCreateButton] = useState(false);
  const navigate = useNavigate();
  const USERID = useSelector((store: Store) => store.userSession.user?.userid);
  const onFinish = (values: any) => {
    create({
      variables: {
        createNoteInput: {
          notes: values.notes,
          resourceid: Number(id),
          createdby: USERID,
        },
      },
    })
      .then(() => {
        refetch();
        setCreateButton(false);
      })
      .catch((e) => {
        console.log('🚀 ~ file: Notes.tsx ~ line 44 ~ onFinish ~ e', e);
      });
  };

  if (loading) {
    return <Spin />;
  }
  return (
    <div className="top">
      {!createbutton ? (
        <>
          <Button
            type="primary"
            onClick={() => setCreateButton(true)}
            style={{
              float: 'right',
              marginTop: '1rem',
            }}
          >
            <PlusOutlined />
            Add Note
          </Button>
          <Button
            type="primary"
            onClick={() => navigate('/manageresource')}
            style={{
              float: 'right',
              marginTop: '1rem',
              marginRight: '.7rem',
            }}
          >
            <ArrowLeftOutlined /> Back to Resources
          </Button>
        </>
      ) : (
        <Form onFinish={onFinish}>
          <Row>
            <Col md={{ span: 10, offset: 2 }}>
              <Form.Item name="notes">
                <Input placeholder="Enter Note" />
              </Form.Item>
            </Col>
            <Col md={{ span: 3, offset: 1 }}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col md={{ span: 3, offset: 1 }}>
              <Form.Item>
                <Button
                  type="primary"
                  style={{ width: '100%' }}
                  danger
                  onClick={() => setCreateButton(true)}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
      <br />
      <br />
      <br />
      <div>
        <Table
          columns={columns}
          dataSource={
            data.findNoteByResourceid
              ? data.findNoteByResourceid.map((val: any, index: any) => ({
                  ...val,
                  tableId: index + 1,
                }))
              : null
          }
          rowKey={(record: any) => record?.id}
          scroll={{ x: 1000 }}
          className="admintable"
        />
      </div>
    </div>
  );
}
