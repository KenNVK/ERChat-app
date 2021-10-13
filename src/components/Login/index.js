import React from "react";
import "antd/dist/antd.css";
import { Button, Row, Col, Typography } from "antd";
const { Title } = Typography;
export default class Login extends React.Component {
  state = {
    loadings: [],
  };

  enterLoading = (index) => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };

  render() {
    const { loadings } = this.state;
    return (
      <>
        <Title>Login</Title>
        <Row justify="center">
          <Col span={8}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              loading={loadings[0]}
              onClick={() => this.enterLoading(0)}
            >
              Login with Google
            </Button>

            <Button
              style={{ width: "100%", marginTop: "5px" }}
              type="primary"
              loading={loadings[1]}
              onClick={() => this.enterLoading(1)}
            >
              Login with Facebook
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
