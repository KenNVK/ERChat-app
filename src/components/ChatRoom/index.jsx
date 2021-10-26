import React from "react";
import Sidebar from "./Sidebar";
import { Row, Col } from "antd";
import ChatWindow from "./ChatWindow";

export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={8}>
          <Sidebar />
        </Col>
        <Col span={16}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
}
