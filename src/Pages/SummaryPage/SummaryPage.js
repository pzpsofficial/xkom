import React from 'react';

import { Row, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';
import ReservationsList from '../../components/ReservationsList/ReservationsList';

const { Title } = Typography;

const SummaryPage = () => {
  const { userSeats } = useSelector((state) => state.seats);

  return (
    <Row style={{ padding: '40px' }}>
      <Space direction="vertical" size={40}>
        <Title style={{ fontWeight: 'bold' }}>
          Twoja rezerwacja przebiegła pomyślnie!
        </Title>
        <Space direction="vertical" size={-35}>
          <ReservationsList message="Wybrałeś miejsca:" seats={userSeats} />
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
