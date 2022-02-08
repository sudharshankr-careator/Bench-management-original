import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SKILLS from '../../constants/skill';
import STYLES from '../../constants/style';
import ACCOUNT_MANAGER_SERVICE from '../../services/AccountManagerService';
import USER_SERVICE from '../../services/UserService';
import { Store } from '../../types/Redux';

const { Option } = Select;

export default function CreateResource() {
  const navigate = useNavigate();
  const [code] = useState('91');
  const [file, setFile] = useState<any>('');
  const [fileList, setfileList] = useState<any>([]);
  const acc = useQuery(USER_SERVICE.GET_ACC);

  const [form] = Form.useForm();
  const userId = useSelector((store: Store) => store.userSession.user?.userid);
  const username = useSelector(
    (store: Store) => store.userSession.user?.username,
  );
  useEffect(() => {
    acc.refetch();
  }, []);
  const [createresource] = useMutation(ACCOUNT_MANAGER_SERVICE.CREATE_RESOURCE);
  const [update] = useMutation(ACCOUNT_MANAGER_SERVICE.UPDATE_RESOURCE);
  function onChange(e: any) {
    setFile(e.file);
    const formdata = new FormData();
    formdata.append('docfile', e.file);

    const isLt2M = e.file.size / 1024 / 1024 < 8;
    if (!isLt2M) {
      alert('File must smaller than 8MB!');
      return;
    }
  }
  const dummyRequest = (file: any, onSuccess: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const onFinish = async (values: any) => {
    console.log(
      'Received values of form: ',
      values.projectreleasedate
        ? values.projectreleasedate._d.toISOString()
        : null,
    );
    try {
      const formdata = new FormData();
      formdata.append('docfile', file);
      const RESOURCE = await createresource({
        variables: {
          createResourceInput: {
            fullname: values.fullname,
            empid: values.empid,
            doj: values.doj._d.toISOString(),
            gender: values.gender,
            primaryphonenumber: values.primaryphonenumber,
            emailid: values.emailid,
            personalemailid: values.personalemailid,
            accname: values.accname,
            designation: values.designation,
            accountmanagerid: values.accmanager,
            skills: values.skills ? values.skills.join(',') : '',
            projectreleasedate: values.projectreleasedate
              ? values.projectreleasedate._d.toISOString()
              : null,
            projectreleasereason: values.projectreleasereason,
            statuscode: 'V',
            createdby: userId,
          },
        },
      });
      const UPLOAD = await ACCOUNT_MANAGER_SERVICE.UPLOAD_DOCUMENT(
        formdata,
        RESOURCE.data.createResource.id,
      );
      const UPDATE = await update({
        variables: {
          updateResourceInput: {
            id: Number(RESOURCE.data.createResource.id),
            resumeid: Number(UPLOAD.data.id),
          },
        },
      });
      navigate('/manageresource');

      const MAIL = await USER_SERVICE.SEND_MAIL({
        sendto: 'mohankesappa@gmail.com; sudharshanreddykr@gmail.com',
        temp: 'UserCreated',
        data: {
          username: username || '',
          firstname: values.fullname || '',
          lastname: values.lastname || '',
          status: 'Available',
        },
        subject: 'Resource Created',
      });
    } catch (e) {
      console.log('🚀 ~ file: CreateResource.tsx ~ line 121 ~ onFinish ~ e', e);
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue={code}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  if (acc.loading) {
    return <Spin />;
  }
  return (
    <div className="top">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{}}
      >
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Full Name"
              name="fullname"
              required
              tooltip="fullname"
              rules={[{ required: true, message: 'Please input Full Name!' }]}
            >
              <Input placeholder="First Name" style={STYLES.BORDER_RADIUS} />
            </Form.Item>{' '}
          </Col>

          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Employee Id"
              name="empid"
              rules={[{ required: true, message: 'Please input Employee Id!' }]}
            >
              <Input placeholder="Employee Id" style={STYLES.BORDER_RADIUS} />
            </Form.Item>{' '}
          </Col>

          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Date Of Join"
              name={'doj'}
              rules={[
                { required: true, message: 'Please input Date Of Join!' },
              ]}
            >
              <DatePicker
                placeholder="Date of Join"
                style={STYLES.MAXWIDTH_BORDER_RADIUS}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Phone Number"
              name="primaryphonenumber"
              rules={[
                { required: true, message: 'Please input phone number!' },
              ]}
            >
              <Input
                placeholder="phonenumber"
                addonBefore={prefixSelector}
                style={STYLES.BORDER_RADIUS}
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Email"
              name="emailid"
              rules={[{ required: true, message: 'Please Enter Email Id ' }]}
            >
              <Input placeholder="Email" style={STYLES.BORDER_RADIUS} />
            </Form.Item>{' '}
          </Col>

          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Personal Email"
              name="personalemailid"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Personal Email',
                },
              ]}
            >
              <Input
                placeholder="Personal Email"
                style={STYLES.BORDER_RADIUS}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: 'Select Gender!',
                },
              ]}
            >
              <Select
                placeholder="Select Gender"
                style={STYLES.MAXWIDTH_BORDER_RADIUS}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Designation"
              required
              name="designation"
              rules={[{ required: true, message: 'Please input Designation!' }]}
            >
              <Input placeholder="Designation" style={STYLES.BORDER_RADIUS} />
            </Form.Item>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Account Name" name={'accname'}>
              <Input placeholder="Account Name" style={STYLES.BORDER_RADIUS} />
            </Form.Item>{' '}
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Account Manger" name={'accmanager'}>
              <Select
                placeholder="Select Account Manger"
                style={STYLES.MAXWIDTH_BORDER_RADIUS}
              >
                {acc.data.findacc &&
                  acc.data.findacc.map((val: any) => (
                    <Option value={val.user.userid}>{val.user.username}</Option>
                  ))}
              </Select>
            </Form.Item>{' '}
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Skills"
              name="skills"
              tooltip="Mention all skills"
            >
              <Select
                mode="multiple"
                allowClear
                style={STYLES.MAXWIDTH_BORDER_RADIUS}
                placeholder="Please select"
                options={SKILLS}
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Project Release Date" name={'projectreleasedate'}>
              <DatePicker
                placeholder="Project Release Date"
                style={STYLES.MAXWIDTH_BORDER_RADIUS}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Release Reason" name={'releasereason'}>
              <Input
                placeholder="Release Reason"
                style={STYLES.BORDER_RADIUS}
              />
            </Form.Item>{' '}
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item name="filename" label="Resume">
              <Upload
                name="file"
                style={{ width: '100%' }}
                onChange={(e) => onChange(e)}
                beforeUpload={() => false}
                customRequest={() => dummyRequest}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />} style={STYLES.BORDER_RADIUS}>
                  Click to upload Resume
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 5, offset: 6 }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={STYLES.MAXWIDTH_BORDER_RADIUS}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            <Form.Item>
              <Button
                type="primary"
                style={STYLES.MAXWIDTH_BORDER_RADIUS}
                danger
                onClick={() => navigate('/manageresource')}
              >
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
