import { UploadOutlined } from '@ant-design/icons';
import { NetworkStatus, useMutation, useQuery } from '@apollo/client';
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
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CONSTANTS from '../../constants';
import SKILLS from '../../constants/skill';
import STYLES from '../../constants/style';
import ACCOUNT_MANAGER_SERVICE from '../../services/AccountManagerService';
import USER_SERVICE from '../../services/UserService';
import { Store } from '../../types/Redux';

const { Option } = Select;

export default function UpdateResource() {
  const acc = useQuery(USER_SERVICE.GET_ACC);

  const [code] = useState('91');
  let worker: any = null;
  const userId = useSelector((store: Store) => store.userSession.user?.userid);
  const username = useSelector(
    (store: Store) => store.userSession.user?.username,
  );
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const [filepath, setFilepath] = useState<any>(null);
  const [file, setFile] = useState<any>(null);

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

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, refetch, networkStatus } = useQuery(
    ACCOUNT_MANAGER_SERVICE.RESOURES,
    {
      variables: {
        resourceId: Number(id),
      },
    },
  );

  useEffect(() => {
    refetch();
    acc.refetch();
  }, []);
  const [update] = useMutation(ACCOUNT_MANAGER_SERVICE.UPDATE_RESOURCE);
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log(values.accmanager, 'Ls');

    try {
      const formdata = new FormData();
      formdata.append('docfile', file);

      if (
        (values.accmanager && values.statuscode === CONSTANTS.STATUS[1]) ||
        CONSTANTS.STATUS_CODE[1]
      ) {
        values.statuscode = CONSTANTS.STATUS_CODE[0];
        console.log(values.statuscode);
      }

      await update({
        variables: {
          updateResourceInput: {
            id: Number(id),
            fullname: values.fullname,
            empid: values.empid,
            doj: values.doj._d.toISOString(),
            gender: values.gender,
            primaryphonenumber: values.primaryphonenumber,
            emailid: values.emailid,
            personalemailid: values.personalemailid,
            accname: values.accname,
            designation: values.designation,
            accountmanagerid: data.resource.accmanager
              ? values.accmanager === data.resource.accmanager.username
                ? data.resource.accmanager.userid
                : values.accmanager
              : values.accmanager,
            skills: values.skills ? values.skills.join(',') : '',
            projectreleasedate: values.projectreleasedate
              ? values.projectreleasedate._d.toISOString()
              : null,
            projectreleasereason: values.projectreleasereason,
            statuscode:
              values.statuscode == CONSTANTS.STATUS[0]
                ? CONSTANTS.STATUS_CODE[0]
                : values.statuscode == CONSTANTS.STATUS[1]
                ? CONSTANTS.STATUS_CODE[1]
                : values.statuscode == CONSTANTS.STATUS[2]
                ? CONSTANTS.STATUS_CODE[2]
                : values.statuscode == CONSTANTS.STATUS[3]
                ? CONSTANTS.STATUS_CODE[3]
                : values.statuscode == CONSTANTS.STATUS[4]
                ? CONSTANTS.STATUS_CODE[4]
                : values.statuscode == CONSTANTS.STATUS[5]
                ? CONSTANTS.STATUS_CODE[5]
                : values.statuscode,
            updatedby: userId,
          },
        },
      });

      if (file != null) {
        data.resource && data.resource.document
          ? await ACCOUNT_MANAGER_SERVICE.UPDATE_DOCUMENT(
              formdata,
              data.resource.id,
              data.resource.document.id,
            )
              .then(() => {
                refetch();
              })
              .catch((e) => {
                console.log(
                  '🚀 ~ file: UpdateResource.tsx ~ line 123 ~ .then ~ e',
                  e,
                );
              })
          : await ACCOUNT_MANAGER_SERVICE.UPLOAD_DOCUMENT(
              formdata,
              data.resource.id,
            )
              .then(() => {
                refetch();
              })
              .catch((e) => {
                console.log(
                  '🚀 ~ file: UpdateResource.tsx ~ line 123 ~ .then ~ e',
                  e,
                );
              });
      }

      navigate('/manageresource');
      await USER_SERVICE.SEND_MAIL({
        sendto: 'mohankesappa@gmail.com; sudharshanreddykr@gmail.com',
        temp: 'UserUpdated',
        data: {
          username: username || '',
          firstname: values.firstname || '',
          lastname: values.lastname || '',
          status:
            values.statuscode == CONSTANTS.STATUS_CODE[0]
              ? CONSTANTS.STATUS[0]
              : values.statuscode == CONSTANTS.STATUS_CODE[1]
              ? CONSTANTS.STATUS[1]
              : values.statuscode == CONSTANTS.STATUS_CODE[2]
              ? CONSTANTS.STATUS[2]
              : values.statuscode == CONSTANTS.STATUS_CODE[3]
              ? CONSTANTS.STATUS[3]
              : values.statuscode == CONSTANTS.STATUS_CODE[4]
              ? CONSTANTS.STATUS[4]
              : values.statuscode == CONSTANTS.STATUS_CODE[5]
              ? CONSTANTS.STATUS[5]
              : values.statuscode,
        },
        subject: 'Resource Updated',
      });
    } catch (e) {
      console.log('🚀 ~ file: UpdateResource.tsx ~ line 174 ~ onFinish ~ e', e);
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue={code}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  if (loading || acc.loading) {
    return <Spin />;
  }
  const GET_DOC = async (data: any) => {
    try {
      const path = await ACCOUNT_MANAGER_SERVICE.GET_DOCUMENT(
        data.id,
        data.document?.filename,
      );
      setFilepath(path.config.url);
    } catch (e) {
      console.log(
        '🚀 ~ file: UpdateResource.tsx ~ line 195 ~ constGET_DOC= ~ e',
        e,
      );
    }
  };

  if (networkStatus == NetworkStatus.ready) {
    form.setFieldsValue({
      fullname: data.resource.fullname,
      empid: data.resource.empid,
      gender: data.resource.gender,
      primaryphonenumber: data.resource.primaryphonenumber,
      emailid: data.resource.emailid,
      personalemailid: data.resource.personalemailid,
      accname: data.resource.accname,
      designation: data.resource.designation,
      accmanager:
        (data.resource.accmanager && data.resource.accmanager.username) || null,
      skills: data.resource.skills ? data.resource.skills.split(',') : null,
      projectreleasereason: data.resource.projectreleasereason,
    });
    GET_DOC(data.resource);
    worker = {
      projectreleasedate: data.resource.projectreleasedate
        ? moment(data.resource.projectreleasedate)
        : null,
      doj: data.resource.doj ? moment(data.resource.doj) : null,
      statuscode:
        data.resource.statuscode == CONSTANTS.STATUS_CODE[0]
          ? CONSTANTS.STATUS[0]
          : data.resource.statuscode == CONSTANTS.STATUS_CODE[1]
          ? CONSTANTS.STATUS[1]
          : data.resource.statuscode == CONSTANTS.STATUS_CODE[2]
          ? CONSTANTS.STATUS[2]
          : data.resource.statuscode == CONSTANTS.STATUS_CODE[3]
          ? CONSTANTS.STATUS[3]
          : data.resource.statuscode == CONSTANTS.STATUS_CODE[4]
          ? CONSTANTS.STATUS[4]
          : data.resource.statuscode == CONSTANTS.STATUS_CODE[5]
          ? CONSTANTS.STATUS[5]
          : null,
    };
  }
  return (
    <div className="top">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={worker}
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
              required
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
              required
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
                format={dateFormatList}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Project Release Reason"
              name={'projectreleasereason'}
            >
              <Input
                placeholder="Project Release Reason"
                style={STYLES.BORDER_RADIUS}
              />
            </Form.Item>{' '}
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Change Status" name={'statuscode'}>
              <Select
                style={STYLES.MAXWIDTH_BORDER_RADIUS}
                placeholder="Please select"
              >
                <Option value={CONSTANTS.STATUS_CODE[0]}>
                  {CONSTANTS.STATUS[0]}
                </Option>
                <Option value={CONSTANTS.STATUS_CODE[1]}>
                  {CONSTANTS.STATUS[1]}
                </Option>
                <Option value={CONSTANTS.STATUS_CODE[2]}>
                  {CONSTANTS.STATUS[2]}
                </Option>
                <Option value={CONSTANTS.STATUS_CODE[3]}>
                  {CONSTANTS.STATUS[3]}
                </Option>
                <Option value={CONSTANTS.STATUS_CODE[4]}>
                  {CONSTANTS.STATUS[4]}
                </Option>
                <Option value={CONSTANTS.STATUS_CODE[5]}>
                  {CONSTANTS.STATUS[5]}
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item name="filename" label="Resume">
              <Upload
                name="file"
                onChange={(e) => onChange(e)}
                beforeUpload={() => false}
                customRequest={() => dummyRequest}
                maxCount={1}
                showUploadList={{
                  showDownloadIcon: true,
                  downloadIcon: 'download ',
                  showRemoveIcon: false,
                  removeIcon: false,
                }}
                fileList={
                  data.resource.document
                    ? [
                        {
                          uid: data.resource.document.id,
                          name: data.resource.document.documentname,
                          status: 'done',
                          url: filepath,
                        },
                      ]
                    : []
                }
              >
                <Button
                  icon={<UploadOutlined />}
                  style={STYLES.MAXWIDTH_BORDER_RADIUS}
                >
                  Click to Update Resume
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
