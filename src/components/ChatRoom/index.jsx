<<<<<<< HEAD
import { Typography, Col, Row } from "antd";
import React from "react";
import UserInfor from "./userInfor";
import RoomList from "./roomList";
const { Title } = Typography;
=======
import React from "react";
import Sidebar from "./Sidebar";
import { Row, Col } from "antd";
import ChatWindow from "./ChatWindow";

>>>>>>> 47777b9c017dbae076df5a3b6178f49d0550da24
export default function ChatRoom() {
  return (
    <div>
      <Row>
<<<<<<< HEAD
        <Col span={8} style={{ height: "100vh" }}>
          <Title level={3}>This is room list</Title>
          <UserInfor />
          <RoomList />
        </Col>
        <Col span={16}>
          <Title level={3}>This is Room'name</Title>
=======
        <Col span={8}>
          <Sidebar />
        </Col>
        <Col span={16}>
          <ChatWindow />
>>>>>>> 47777b9c017dbae076df5a3b6178f49d0550da24
        </Col>
      </Row>
    </div>
  );
}
