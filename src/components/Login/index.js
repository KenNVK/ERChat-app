import React from "react";
import { Row, Col, Button, Typography } from "antd";

const { Title } = Typography;

export default function Login() {
  return (
    <>
      <Title style={{ textAlign: "center" }} Level={3}>
        Login
      </Title>
      <Row justify="center">
        <Col span={8}>
          <Button type="primary" style={{ width: "100%", marginBottom: 5 }}>
            Login with Google
          </Button>

          <Button type="primary" style={{ width: "100%" }}>
            Login with Facebook
          </Button>
        </Col>
      </Row>
    </>
  );
}
