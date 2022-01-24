import React from "react";
import { Row, Col, Typography, Tooltip } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";
import { GithubOutlined } from "@ant-design/icons";
const { Link } = Typography;

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #37373a;
  color: #fff;
  height: 100vh;

  .src-icon {
    font-size: 30px;
    padding: 10px;
    color: #fff;
  }
`;

export default function Sidebar() {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Link className="src-icon" target="_blank" href="https://github.com/KenNVK/ERChat-app">
            <Tooltip placement="topRight" title="ソースコードー">
              <GithubOutlined />
            </Tooltip>
          </Link>
        </Col>
      </Row>
    </SidebarStyled>
  );
}
