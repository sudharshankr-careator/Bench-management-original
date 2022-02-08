import { useMutation } from "@apollo/client";
import { Button, Form, Input, notification, Space, Typography } from "antd";
import React, { useState } from "react";
import CONSTANTS from "../../constants";
import STYLES from "../../constants/style";
import USER_SERVICE from "../../services/UserService";

const { Text } = Typography;

const ForgetPassword = (props: any) => {
  const { toggle } = props;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [forgot] = useMutation(USER_SERVICE.FORGOT_PASSWORD);

  const HOST = `http://${CONSTANTS.HOST}/reset`;

  const onFinish = async () => {
    try {
      await forgot({
        variables: {
          forgot: {
            email: email,
            host1: HOST,
          },
        },
      });
      await openNotification();
      toggle();
    } catch (error: any) {
      setError(error.message.toString());
    }
  };

  const openNotification = () => {
    notification.info({
      message: `Notification `,
      description: "Please Check your Email and Reset your password",
    });
  };

  return (
    <>
      <h2>Forgot Password</h2>
      <Text type="danger">{error}</Text>
      <Form
        name="normal_login"
        layout="vertical"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="userEmail"
          rules={[{ required: true, message: "Please enter Email" }]}
        >
          <Input
            placeholder="Enter Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            style={STYLES.BORDER_RADIUS}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              danger
              onClick={toggle}
              style={STYLES.BORDER_RADIUS}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={STYLES.BORDER_RADIUS}
            >
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgetPassword;
