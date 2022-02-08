import { Col, Row, Image } from "antd";
import React, { Component } from "react";
import logo from "../../assets/Logo.svg";
export default class Logo extends Component {
  render() {
    return (
      <Row justify={"start"}>
        <Col span={5} offset={2}>
          <Image
            width={180}
            src={logo}
            preview={false}
            style={{ marginTop: "2rem" }}
          />
        </Col>
      </Row>
    );
  }
}
