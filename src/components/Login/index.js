import React from "react";
import { Row, Col } from "antd";

export default function Login() {
  return (
    <div>
      <Row>
        <Col span={8}>Login with Google</Col>
        <Col span={8}>Login with Facebook</Col>
      </Row>
    </div>
  );
}
