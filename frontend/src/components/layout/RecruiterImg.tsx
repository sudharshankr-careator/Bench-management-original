import { Col, Image } from 'antd';
import React, { Component } from 'react';
import rec from '../../assets/loginwallpaper.jpg';
export default class RecruiterImg extends Component {
  render() {
    return (
      <Col xs={24} md={{ span: 6, offset: 1 }} style={{ marginTop: '3.5rem' }}>
        <Image
          src={rec}
          preview={false}
          className="img1"
          width={480}
          height={350}
          style={{ borderRadius: '0.5rem' }}
        />
      </Col>
    );
  }
}
