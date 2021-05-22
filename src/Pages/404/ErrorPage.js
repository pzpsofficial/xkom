import React from 'react';

import { Typography, Row, Button, Space } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

const ErrorPage = () => {
  const history = useHistory();

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Space direction="vertical" align="center" size={30}>
        <Space direction="vertical" size={-15} align="center">
          <Title type="warning">404</Title>
          <Title level={2} type="secondary">
            Ups... Taka strona nie istnieje...
          </Title>
        </Space>
        <Button onClick={() => history.push('/')} size="large">
          Wróć na stronę główną
        </Button>
      </Space>
    </Row>
  );
};

export default ErrorPage;
