import React from 'react';

import { Row, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';

const { Title, Paragraph } = Typography;

const SummaryPage = () => {
  const { userSeats } = useSelector((state) => state.seats);

  return (
    <Row style={{ padding: '40px' }}>
      <Space direction="vertical" size={40}>
        <Title style={{ fontWeight: 'bold' }}>
          Twoja rezerwacja przebiegła pomyślnie!
        </Title>
        <Space direction="vertical" size={-35}>
          <Paragraph style={{ fontSize: '35px' }}>Wybrałeś miejsca:</Paragraph>
          {userSeats.map((seat) => {
            return (
              <Paragraph style={{ fontSize: '35px' }}>
                - rząd x{seat.cords.x}, miejsce y{seat.cords.y} ({seat.id})
              </Paragraph>
            );
          })}
        </Space>
        <Title level={2}>
          Dziękujemy! W razie problemów prosimy o kontakt z działem
          administracji.
        </Title>
      </Space>
    </Row>
  );
};

export default SummaryPage;
