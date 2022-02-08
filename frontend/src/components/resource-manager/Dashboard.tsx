import { useQuery } from '@apollo/client';
import { Card, Col, Row, Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../../constants';
import STYLES from '../../constants/style';
import '../../css/DashboardStyle.css';
import ACCOUNT_MANAGER_SERVICE from '../../services/AccountManagerService';
import { Store } from '../../types/Redux';

export default function Dashboard() {
  const name = useSelector((store: Store) => store.userSession.user?.username);
  const navgiate = useNavigate();
  const [count, setCount] = useState<any>({});
  const A = useQuery(ACCOUNT_MANAGER_SERVICE.A_COUNT);
  const V = useQuery(ACCOUNT_MANAGER_SERVICE.V_COUNT);
  const B = useQuery(ACCOUNT_MANAGER_SERVICE.B_COUNT);
  const L = useQuery(ACCOUNT_MANAGER_SERVICE.L_COUNT);

  useEffect(() => {
    A.refetch();
    B.refetch();
    L.refetch();
    V.refetch();
  }, []);
  console.log(count);
  if (A.loading || V.loading || B.loading || L.loading) {
    return <Spin />;
  }
  return (
    <Content
      className="content"
      style={{ marginLeft: '1rem', marginTop: '1rem' }}
    >
      <Card className="Dash-background">
        <h1 style={{ textAlign: 'center' }}>
          Welcome to Careator Bench Management Application.
        </h1>
        <h1 style={{ textAlign: 'center' }}>Hi {name} 🦁</h1>

        <Row gutter={10} className="DashRow">
          {/* <Col span={6}>
            <Card
              className="cardData "
              style={{ background: STYLES.colourList[0] }}
              hoverable
              onClick={() =>
                navgiate(`/manageresource/${CONSTANTS.STATUS_CODE[0]}`)
              }
            >
              <h4 className="addSize center">
                {CONSTANTS.STATUS[0]} <br />
                {A.data.findACount}
              </h4>
            </Card>
          </Col> */}
          <Col span={6}>
            <Card
              className="cardData"
              style={{ background: STYLES.colourList[1] }}
              hoverable
              onClick={() =>
                navgiate(`/manageresource/${CONSTANTS.STATUS_CODE[1]}`)
              }
            >
              <h4 className="addSize center">
                {CONSTANTS.STATUS[1]} <br />
                {V.data.findVCount}
              </h4>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              className="cardData"
              style={{ background: STYLES.colourList[3] }}
              hoverable
              onClick={() =>
                navgiate(`/manageresource/${CONSTANTS.STATUS_CODE[3]}`)
              }
            >
              <h4 className="addSize center">
                {CONSTANTS.STATUS[3]} <br />
                {L.data.findLCount}
              </h4>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              className="cardData"
              style={{ background: STYLES.colourList[2] }}
              hoverable
              onClick={() =>
                navgiate(`/manageresource/${CONSTANTS.STATUS_CODE[2]}`)
              }
            >
              <h4 className="addSize center">
                {CONSTANTS.STATUS[2]} <br />
                {B.data.findBCount}
              </h4>
            </Card>
          </Col>
        </Row>
        <Row className="DashRow"></Row>
      </Card>
    </Content>
  );
}
