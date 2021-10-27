import { Typography, Col, Row } from "antd";
import React from "react";
import UserInfor from "./userInfor";
import RoomList from "./roomList";
const { Title } = Typography;
export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={8} style={{ height: "100vh" }}>
          <Title level={3}>This is room list</Title>
          <UserInfor />
          <RoomList />
        </Col>
        <Col span={16}>
          <Title level={3}>This is Room'name</Title>
        </Col>
      </Row>
    </div>
  );
}
