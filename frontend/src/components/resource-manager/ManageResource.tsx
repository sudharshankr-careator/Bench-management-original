import {
  CloudUploadOutlined,
  ContainerTwoTone,
  EditOutlined,
  FileExcelTwoTone,
  PlusOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Input,
  Modal,
  notification,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CONSTANTS from '../../constants';
import ACCOUNT_MANAGER_SERVICE from '../../services/AccountManagerService';
import USER_SERVICE from '../../services/UserService';
import { Store } from '../../types/Redux';

export default function ManageResource() {
  const navigate = useNavigate();
  const { code } = useParams();
  const [hidden, setHiden] = useState(false);
  const ROLE = useSelector((store: Store) => store.userSession.user?.role);
  const userid = useSelector((store: Store) => store.userSession.user?.userid);
  const [load, setLoad] = useState(false);
  const [visiable, setVisible] = useState(false);
  const [visiable1, setVisible1] = useState(false);
  const [switchh, setSwitch] = useState({
    id: null,
    isactive: null,
    statuscode: '',
  });
  const [current, setcurrent] = useState(1);
  const AM = useQuery(USER_SERVICE.FIND_BY_ROLE, {
    variables: {
      role: 'AM',
    },
  });
  const [am, setAm] = useState({
    id: 0,
    username: '',
    email: '',
    mobile: '',
    roleid: (AM && AM.data && AM.data.findByRole && AM.data.findByRole.id) || 2,
  });
  const username = useSelector(
    (store: Store) => store.userSession.user?.username,
  );
  let { data, loading, refetch } = useQuery(
    ACCOUNT_MANAGER_SERVICE.ACTIVE_OR_INACTIVE_RESOURCE,
    {
      variables: {
        isactive: true,
      },
    },
  );
  const [updateSwitch] = useMutation(ACCOUNT_MANAGER_SERVICE.UPDATE_RESOURCE);
  const [create] = useMutation(USER_SERVICE.CREATE_USER);

  let [name, setName] = useState('');

  const [filepath, setFilepath] = useState<any>(null);
  const [file, setFile] = useState<any>(null);

  const openNotification = (placement: any) => {
    notification.open({
      message: 'Upload Done',
      description: 'Resources are created.',
      icon: <CloudUploadOutlined style={{ color: '#108ee9' }} />,
      placement,
    });
  };

  async function onupload(e: any) {
    setFile(e.file);
    console.log(file);
    const formdata = new FormData();
    formdata.append('docfile', e.file);

    const isLt2M = e.file.size / 1024 / 1024 < 8;
    if (!isLt2M) {
      alert('File must smaller than 8MB!');
      return;
    }
    setLoad(true);
    await ACCOUNT_MANAGER_SERVICE.RESOURCE_UPLOAD(userid, formdata)
      .then(async () => {
        setLoad(false);

        await openNotification('bottomRight');
        await refetch();
        await USER_SERVICE.SEND_MAIL({
          sendto: 'mohankesappa@gmail.com; sudharshanreddykr@gmail.com',
          temp: 'BulkCreate',
          data: {
            username: username || '',
            firstname: '',
            lastname: '',
            status: 'Available',
          },
          subject: 'Bulk Resource Created',
        });
      })
      .catch((e) => {
        setLoad(false);
        console.log(
          '🚀 ~ file: ManageResource.tsx ~ line 84 ~ onupload ~ e',
          e,
        );
      });
  }

  const dummyRequest = (file: any, onSuccess: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  useEffect(() => {
    console.log(code, 'filter');
    if (ROLE == CONSTANTS.ROLE[1]) setHiden(true);
  }, []);
  const onchange = async () => {
    await updateSwitch({
      variables: {
        updateResourceInput: {
          id: Number(switchh.id),
          isactive: switchh.isactive,
          statuscode: switchh.isactive == false ? 'R' : switchh.statuscode,
        },
      },
    })
      .then(() => refetch())
      .catch((e) => {
        console.log(
          '🚀 ~ file: ManageResource.tsx ~ line 24 ~ onchange ~ e',
          e,
        );
      });
  };
  useEffect(() => {
    refetch();
  }, []);
  const columns = [
    {
      title: <strong>Emp ID</strong>,
      dataIndex: 'empid',
      width: '5%',
    },
    {
      title: <strong>Name</strong>,
      dataIndex: 'fullname',
      width: '13%',
      render: (val: any, obj: any) => (
        <Tooltip title="View Details" placement="bottom" color="#2db7f5">
          <a
            onClick={() => {
              navigate(`/resourcedetails/${obj.id}`);
            }}
          >
            {obj.fullname}
          </a>
        </Tooltip>
      ),
      sorter: (a: any, b: any) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: <strong>Email</strong>,
      dataIndex: 'emailid',
      width: '19%',
    },
    {
      title: <strong>Designation</strong>,
      dataIndex: 'designation',
      width: '16%',
    },
    {
      title: <strong>Phone</strong>,
      dataIndex: 'primaryphonenumber',
      width: '10%',
    },
    {
      title: <strong>Account Manager</strong>,
      dataIndex: ['accmanager', 'username'],
      width: '12%',
      render: (val: any) => val || 'RMG',
    },

    {
      title: <strong>Status</strong>,
      dataIndex: 'statuscode',
      filters: CONSTANTS.STATUS_LIST,
      width: '10%',
      hidden: hidden,
      onFilter: (value: any, record: any) =>
        record.statuscode.indexOf(value) === 0,

      render: (status: any) => (
        <>
          {status == CONSTANTS.STATUS_CODE[0] ? (
            <Tag color={CONSTANTS.COLORS[0]} key={status}>
              {CONSTANTS.STATUS[0]}
            </Tag>
          ) : status == CONSTANTS.STATUS_CODE[1] ? (
            <Tag color={CONSTANTS.COLORS[1]} key={status}>
              {CONSTANTS.STATUS[1]}
            </Tag>
          ) : status == CONSTANTS.STATUS_CODE[2] ? (
            <Tag color={CONSTANTS.COLORS[2]} key={status}>
              {CONSTANTS.STATUS[2]}
            </Tag>
          ) : status == CONSTANTS.STATUS_CODE[3] ? (
            <Tag color={CONSTANTS.COLORS[3]} key={status}>
              {CONSTANTS.STATUS[3]}
            </Tag>
          ) : status == CONSTANTS.STATUS_CODE[4] ? (
            <Tag color={CONSTANTS.COLORS[4]} key={status}>
              {CONSTANTS.STATUS[4]}
            </Tag>
          ) : status == CONSTANTS.STATUS_CODE[5] ? (
            <Tag color={CONSTANTS.COLORS[5]} key={status}>
              {CONSTANTS.STATUS[5]}
            </Tag>
          ) : null}
        </>
      ),
    },
    {
      title: <strong>Actions</strong>,
      dataIndex: 'action',
      // width: '15%',
      render: (id: any, record: any) => (
        <>
          <Space align="center" size="small">
            <Tooltip title="Edit" placement="bottom" color="#2db7f5">
              <EditOutlined
                style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/updateresource/${record.id}`);
                }}
              />
            </Tooltip>
            <Tooltip title="Note" placement="bottom" color="#2db7f5">
              <ContainerTwoTone
                style={{
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
                twoToneColor="#5b8c00"
                onClick={() => navigate(`/notes/${record.id}`)}
              />
            </Tooltip>

            <Tooltip
              title={record.isactive == true ? 'Active' : 'Resigned'}
              placement="bottom"
              color="#2db7f5"
            >
              <Switch
                size={'small'}
                checked={record.isactive}
                onChange={(checked: any) => (
                  setSwitch((prev: any) => ({
                    ...prev,
                    id: record.id,
                    isactive: checked,
                    statuscode: record.statuscode,
                  })),
                  //onchange(record.id, checked, record.statuscode),
                  setVisible1(true)
                )}
                style={{ fontSize: '1.5rem', cursor: 'pointer' }}
              />
            </Tooltip>
            {!record.isam ? (
              <Tooltip title={'Make him AM'} placement="bottom" color="#2db7f5">
                <UserSwitchOutlined
                  onClick={() => {
                    setAm((prev: any) => ({
                      ...prev,
                      id: record.id,
                      username: record.fullname,
                      email: record.emailid,
                      mobile: record.primaryphonenumber,
                    }));
                    setVisible(true);
                  }}
                />
              </Tooltip>
            ) : null}
          </Space>
        </>
      ),
    },
  ];

  const handleOk = async () => {
    console.log(am);
    const USER = await create({
      variables: {
        createUserInput: {
          username: am.username,
          email: am.email,
          mobile: am.mobile,
          roleid: Number(am.roleid),
        },
      },
    });
    const UPDATE = await updateSwitch({
      variables: {
        updateResourceInput: {
          id: Number(am.id),
          isam: true,
        },
      },
    });
    await refetch();
    setVisible(false);

    const RM = await USER_SERVICE.SEND_MAIL_RM({
      sendto: 'mohankesappa@gmail.com; sudharshanreddykr@gmail.com',
      temp: 'CAM',
      data: {
        username: username || '',
        fullname: am.username,
      },
      subject: 'Created Account Manager',
    });
    const RC = await USER_SERVICE.SEND_MAIL_RM({
      sendto: am.email,
      temp: 'PAM',
      data: {
        username: am.username || '',
        fullname: am.username,
      },
      subject: 'Promotion',
    });
  };

  const handleOk1 = async () => {
    onchange();
    setVisible1(false);
    const RC = await USER_SERVICE.SEND_MAIL_RM({
      sendto: 'mohankesappa@gmail.com; sudharshanreddykr@gmail.com',
      temp: 'InActive',
      data: {
        username: username || '',
        fullname: username,
      },
      subject: 'Resource Resigned',
    });
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleCancel1 = () => {
    setVisible1(false);
  };
  const showtotalitems = (total: any) => `Total ${total} Resources`;
  return (
    <div>
      <Modal
        title="Confirmation"
        visible={visiable}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Proceed to update Resource as "Account Manager"?</p>
      </Modal>
      <Modal
        title="Confirmation"
        visible={visiable1}
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <p>Proceed to "InActivate" the Resource</p>
      </Modal>

      <>
        {/* {data.resource.isactive==true?} */}
        {ROLE == CONSTANTS.ROLE[0] || ROLE == CONSTANTS.ROLE[2] ? (
          <div
            style={{
              float: 'right',
              marginTop: '.8rem',
              marginLeft: '1rem',
            }}
          >
            <Upload
              name="file"
              style={{ width: '90%' }}
              onChange={(e) => onupload(e)}
              beforeUpload={() => false}
              customRequest={() => dummyRequest}
              maxCount={1}
              fileList={[]}
            >
              <Button icon={<FileExcelTwoTone />} type="primary" loading={load}>
                Upload Resources
              </Button>
            </Upload>
          </div>
        ) : null}
        {ROLE == CONSTANTS.ROLE[0] || ROLE == CONSTANTS.ROLE[2] ? (
          <Button
            type="primary"
            onClick={() => navigate('/createresource')}
            style={{
              float: 'right',
              marginTop: '.8rem',
              marginRight: '1rem',
            }}
          >
            <PlusOutlined />
            Add Resource
          </Button>
        ) : null}
        <Input
          placeholder="search..."
          allowClear
          onChange={(e) => setName(e.target.value)}
          style={{ width: 200, marginTop: '.5rem' }}
        />
      </>
      <br />
      <br />
      <br />
      <div>
        <Table
          columns={columns}
          size="small"
          rowClassName={(record) => (record.isam ? 'green' : 'white')}
          dataSource={
            data?.findActiveAndInActiveResource
              ? data.findActiveAndInActiveResource

                  .filter((val: any) => {
                    if (code == undefined) {
                      return val;
                    } else if (val.statuscode === code) {
                      return val;
                    }
                  })
                  .filter((val: any) => {
                    if (name == '') {
                      return val;
                    } else if (
                      val.fullname.toLowerCase().includes(name.toLowerCase()) ||
                      (val.emailid &&
                        val.emailid
                          .toLowerCase()
                          .includes(name.toLowerCase())) ||
                      (val.empid && val.empid.includes(name))
                    ) {
                      return val;
                    }
                  })
                  .map((val: any, index: any) => ({
                    ...val,
                    tableId: index + 1,
                  }))
              : null
          }
          pagination={{
            current: current,
            onChange: (value) => setcurrent(value),
            pageSize: 10,
            total: data?.findActiveAndInActiveResource.length,
            showTotal: showtotalitems,
          }}
          rowKey={(record: any) => record?.id}
          scroll={{ x: 1000, y: 290 }}
          loading={loading}
          className="admintable marginbottom"
        />
      </div>
    </div>
  );
}
