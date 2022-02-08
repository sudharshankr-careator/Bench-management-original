import { Col, Row } from 'antd';
import React, { useState } from 'react';
import ForgotPassword from '../components/auth/ForgotPassword';
import LoginForm from '../components/auth/LoginForm';
import Logo from '../components/layout/Logo';
import RecruiterImg from '../components/layout/RecruiterImg';
import '../css/Login.css';

const Login: React.FC = () => {
  const [forgot, setForgot] = useState(false);

  const toggle = () => setForgot(!forgot);

  return (
    <>
      <Logo />
      <Row wrap={true}>
        <RecruiterImg />
        <Col
          xs={{ span: 18, offset: 3 }}
          md={{ span: 7, offset: 8 }}
          style={{ marginTop: '6rem' }}
          className="inp1"
        >
          {forgot ? (
            <ForgotPassword toggle={toggle} />
          ) : (
            <LoginForm forgot={toggle} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Login;
