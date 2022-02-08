import { useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Input, notification, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Logo from '../components/layout/Logo';
import RecruiterImg from '../components/layout/RecruiterImg';
import STYLES from '../constants/style';
import '../css/Login.css';
import USER_SERVICE from '../services/UserService';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [userId, setUserId] = useState('');
  const [tokenurl, setTokenurl] = useState('');
  const [u, setU] = useState<any>(null);
  const { data, loading } = useQuery(USER_SERVICE.USER_TOKEN, {
    variables: {
      userId: userId,
    },
  });
  const [changePassword] = useMutation(USER_SERVICE.UPDATE_PASSWORD);

  //changing firstTimeLogin to 0 in database

  useEffect(() => {
    setU(window.localStorage.getItem('userId'));
    setUserId(window.location.pathname.split('/')[2]);
    setTokenurl(JSON.stringify(window.location.pathname.split('/')[3]));
  }, []);

  const onFinish = async () => {
    if (u !== null) {
      if (password === cpassword) {
        await changePassword({
          variables: {
            updateUserInput: {
              userid: u,
              passwordhash: password,
            },
          },
        });
        await correctPasswordNotification('topRight');
        await window.localStorage.removeItem('userId');
        setTimeout(() => {
          window.location.href = '/';
        });
      } else {
        confirmPasswordFailureNotification('topRight');
      }
    } else {
      if (data && data.user.usertoken === JSON.parse(tokenurl)) {
        if (password === cpassword) {
          await changePassword({
            variables: {
              updateUserInput: {
                userid: userId,
                passwordhash: password,
              },
            },
          });
          await correctPasswordNotification('topRight');
          setTimeout(() => {
            window.location.href = '/';
          });
        } else {
          confirmPasswordFailureNotification('topRight');
        }
      } else {
        tokenAreNotEqual('topRight');
      }
    }
  };
  const correctPasswordNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: 'Password changed successfully.',
    });
  };

  const confirmPasswordFailureNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: 'Passwords are not matching... try again!',
    });
  };
  const tokenAreNotEqual = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: 'Invalid Token provided... try again!',
    });
  };

  const forgot = () => {
    window.location.href = '/';
  };
  return (
    <>
      <Logo />
      <Row wrap={true} className="tab">
        <RecruiterImg />
        <Col
          xs={{ span: 18, offset: 3 }}
          md={{ span: 7, offset: 8 }}
          style={{ marginTop: '6rem' }}
          className="inp"
        >
          <h2>Reset Password</h2>
          {u !== null ? (
            <h6 style={{ color: '#87bce8' }}>
              You have logged for the 1st time please reset your password
            </h6>
          ) : null}
          <Form
            name="normal_login"
            layout="vertical"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item label="New Password" name="password" hasFeedback>
              <Input.Password
                placeholder="Enter New Password"
                value={password}
                style={STYLES.BORDER_RADIUS}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="cpassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please re-enter New Password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Password not matching'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Confirm your Password"
                value={cpassword}
                style={STYLES.BORDER_RADIUS}
                onChange={(e: any) => setCpassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  danger
                  onClick={forgot}
                  style={STYLES.BORDER_RADIUS}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={STYLES.BORDER_RADIUS}
                >
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default ResetPassword;
