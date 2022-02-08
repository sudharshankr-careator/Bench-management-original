import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Input, Row, Select, Spin } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CONSTANTS from "../../constants";
import USER_SERVICE from "../../services/UserService";
const { Option } = Select;

export default function UpdateUser() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { data, loading, networkStatus, refetch } = useQuery(
    USER_SERVICE.USER,
    {
      variables: {
        userId: id,
      },
    }
  );
  const [create] = useMutation(USER_SERVICE.UPDATE_USER);
  const onFinish = async (values: any) => {
    console.log(values);
    await create({
      variables: {
        updateUserInput: {
          userid: id,
          username: values.username,
          email: values.email,
          mobile: values.mobile,
          roleid:
            values.roleid == "resource-manger"
              ? 3
              : values.roleid == "account-manger"
              ? 2
              : values.roleid == "human-manger"
              ? 4
              : values.roleid == "leader"
              ? 5
              : values.roleid,
        },
      },
    });
    nav("/manageuser");
  };
  if (loading) {
    return <Spin />;
  }

  if (networkStatus == NetworkStatus.ready) {
    form.setFieldsValue({
      username: data.user.username,
      email: data.user.email,
      mobile: data.user.mobile,
      roleid: data.user.userrole.role.description,
    });
  }
  return (
    <div className="top">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row>
          <Col md={{ span: 7, offset: 4 }}>
            <Form.Item
              label=" Name"
              name="username"
              required
              tooltip="firstname"
              rules={[{ required: true, message: "Please input  Name!" }]}
            >
              <Input placeholder=" Name" />
            </Form.Item>{" "}
          </Col>

          <Col md={{ span: 7, offset: 1 }}>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>{" "}
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 7, offset: 4 }}>
            <Form.Item
              label="Mobile"
              name="mobile"
              required
              rules={[{ required: true, message: "Please input Mobile!" }]}
            >
              <Input placeholder="Mobile" />
            </Form.Item>
          </Col>

          <Col md={{ span: 7, offset: 1 }}>
            <Form.Item
              label="Role"
              required
              name="roleid"
              rules={[{ required: true, message: "Please select role" }]}
            >
              <Select style={{ width: "100%" }} placeholder="Please select">
                <Option value={2}>{CONSTANTS.ROLE_NAME[1]}</Option>
                <Option value={3}>{CONSTANTS.ROLE_NAME[2]}</Option>
                <Option value={4}>{CONSTANTS.ROLE_NAME[3]}</Option>
                <Option value={5}>{CONSTANTS.ROLE_NAME[4]}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 6 }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            <Form.Item>
              <Button
                type="primary"
                style={{ width: "100%" }}
                danger
                onClick={() => nav("/manageuser")}
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
