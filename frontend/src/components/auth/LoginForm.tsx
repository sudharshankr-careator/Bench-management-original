import { LoginOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import STYLES from '../../constants/style';
import UserActions from '../../redux/actions/UserActions';
import USER_SERVICE from '../../services/UserService';

const { Text } = Typography;
const LoginForm = (props: any) => {
  const { forgot } = props;
  const [email, setEmail] = useState('');
  const nav = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [login] = useMutation(USER_SERVICE.USER_LOGIN);

  const dispatch = useDispatch();

  const fromStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  };

  const onFinish = async (values: any) => {
    try {
      const log = await login({
        variables: {
          login: {
            email: email,
            passwordhash: password,
          },
        },
      });
      if (log.data.login.firsttimelogin === true) {
        window.localStorage.setItem('userId', log.data.login.userid);

        nav('/reset/:id/:token');
      } else {
        dispatch(UserActions.loginSuccess(log.data.login));
        window.localStorage.setItem('token', log.data.login.token);
      }

      // loginSucess(data); //adding user data to redux store
    } catch (e: any) {
      setError(e.message.toString());
    }
  };

  return (
    <>
      <h2>Login</h2>
      <Text type="danger">{error}</Text>

      <Form
        name="normal_login"
        layout="vertical"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{
          color: 'white',
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter valid email!',
              type: 'email',
            },
          ]}
        >
          <Input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // defaultValue={email1}
            style={STYLES.BORDER_RADIUS}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input.Password
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={STYLES.BORDER_RADIUS}

            // defaultValue={password1}
          />
        </Form.Item>
        <Form.Item style={fromStyle}>
          <Button type="primary" htmlType="submit" style={STYLES.BORDER_RADIUS}>
            <LoginOutlined /> Login
          </Button>
          <Link
            to="/"
            style={{ float: 'right', color: 'blue' }}
            onClick={forgot}
          >
            Forgot Password
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};
export default LoginForm;
